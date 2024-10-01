// src/app/layout.tsx
"use client";

import React, { useMemo } from "react";
import { ConfigProvider } from "@/context/ConfigContext";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import Palette from "@/themes/palette";
import Header from "./_components/Header";
import useConfig from "@/hooks/useConfig";
import defaultConfig from "@/constants/constant";

// Definir las props para RootLayout
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ConfigProvider>
      </body>
    </html>
  );
}

// Definir las props para ThemeWrapper
interface ThemeWrapperProps {
  children: React.ReactNode;
}

function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { mode } = useConfig();

  const theme = useMemo(
    () => Palette(mode as PaletteMode, defaultConfig.themeLayout),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {children}
    </ThemeProvider>
  );
}
