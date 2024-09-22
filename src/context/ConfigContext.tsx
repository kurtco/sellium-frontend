"use client";

import { createContext, ReactNode } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import defaultConfig from "@/constants/constant";

// Define the types for the config
interface ConfigType {
  container: boolean;
  i18n: string;
  mode: string;
  presetColor: string;
  themeDirection: string;
  miniDrawer: boolean;
  menuOrientation: string;
  fontFamily: string;
  onChangeContainer: (container: boolean) => void;
  onChangeLocalization: (lang: string) => void;
  onChangeMode: (mode: string) => void;
  onChangePresetColor: (theme: string) => void;
  onChangeDirection: (direction: string) => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeThemeLayout: (direction: string, miniDrawer: boolean) => void;
  onChangeMenuOrientation: (layout: string) => void;
  onChangeFontFamily: (fontFamily: string) => void;
}

// Define the initial state
const initialState: ConfigType = {
  ...defaultConfig,
  onChangeContainer: () => {},
  onChangeLocalization: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeDirection: () => {},
  onChangeMiniDrawer: () => {},
  onChangeThemeLayout: () => {},
  onChangeMenuOrientation: () => {},
  onChangeFontFamily: () => {},
};

// Create the context
const ConfigContext = createContext<ConfigType>(initialState);

// Define the provider component
interface ConfigProviderProps {
  children: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] = useLocalStorage(
    "mantis-react-next-ts-config",
    initialState
  );

  const onChangeContainer = (container: boolean) => {
    setConfig({ ...config, container });
  };

  const onChangeLocalization = (lang: string) => {
    setConfig({ ...config, i18n: lang });
  };

  const onChangeMode = (mode: string) => {
    setConfig({ ...config, mode });
  };

  const onChangePresetColor = (theme: string) => {
    setConfig({ ...config, presetColor: theme });
  };

  const onChangeDirection = (direction: string) => {
    setConfig({ ...config, themeDirection: direction });
  };

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({ ...config, miniDrawer });
  };

  const onChangeThemeLayout = (direction: string, miniDrawer: boolean) => {
    setConfig({ ...config, miniDrawer, themeDirection: direction });
  };

  const onChangeMenuOrientation = (layout: string) => {
    setConfig({ ...config, menuOrientation: layout });
  };

  const onChangeFontFamily = (fontFamily: string) => {
    setConfig({ ...config, fontFamily });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeContainer,
        onChangeLocalization,
        onChangeMode,
        onChangePresetColor,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeThemeLayout,
        onChangeMenuOrientation,
        onChangeFontFamily,
        presetColor: config.presetColor,
        themeDirection: config.themeDirection,
        fontFamily: config.fontFamily,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, ConfigContext };
