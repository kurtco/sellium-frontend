/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use client";

import { useState, ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache, { EmotionCache, Options } from "@emotion/cache";
import { CacheProvider as DefaultCacheProvider } from "@emotion/react";
import { SerializedStyles } from "@emotion/react";

// Define the props for the provider
interface NextAppDirEmotionCacheProviderProps {
  options: Options;
  CacheProvider?: typeof DefaultCacheProvider;
  children: ReactNode;
}

export function NextAppDirEmotionCacheProvider({
  options,
  CacheProvider = DefaultCacheProvider,
  children,
}: NextAppDirEmotionCacheProviderProps) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;

    let inserted: { name: string; isGlobal: boolean }[] = [];
    const prevInsert = cache.insert;

    cache.insert = (
      selector: string | undefined,
      serialized: SerializedStyles,
      sheet: any,
      shouldCache: boolean
    ) => {
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({
          name: serialized.name,
          isGlobal: !selector,
        });
      }
      return prevInsert(selector || "", serialized, sheet, shouldCache);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    let dataEmotionAttribute = cache.key;

    const globals: { name: string; style: string }[] = [];

    names.forEach(({ name, isGlobal }) => {
      const style = cache.inserted[name] || "";

      if (typeof style !== "boolean") {
        if (isGlobal) {
          globals.push({ name, style });
        } else {
          styles += style;
          dataEmotionAttribute += ` ${name}`;
        }
      }
    });

    return (
      <>
        {globals.map(({ name, style }) => (
          <style
            key={name}
            data-emotion={`${cache.key}-global ${name}`}
            dangerouslySetInnerHTML={{ __html: style }}
          />
        ))}
        {styles && (
          <style
            data-emotion={dataEmotionAttribute}
            dangerouslySetInnerHTML={{ __html: styles }}
          />
        )}
      </>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
