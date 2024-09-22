// src/context/ConfigContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import defaultConfig from "@/constants/constant";
import useLocalStorage from "../hooks/useLocalStorage";

// Definir la interfaz de configuración
interface ConfigType {
  container: boolean;
  i18n: string;
  mode: string;
  presetColor: string;
  themeDirection: "ltr" | "rtl";
  miniDrawer: boolean;
  themeLayout: string;
  menuOrientation: string;
  fontFamily: string;
  onChangeContainer: (container: boolean) => void;
  onChangeLocalization: (lang: string) => void;
  onChangeMode: (mode: string) => void;
  onChangePresetColor: (theme: string) => void;
  onChangeDirection: (direction: "ltr" | "rtl") => void;
  onChangeMiniDrawer: (miniDrawer: boolean) => void;
  onChangeThemeLayout: (direction: "ltr" | "rtl", miniDrawer: boolean) => void;
  onChangeMenuOrientation: (layout: string) => void;
  onChangeFontFamily: (fontFamily: string) => void;
}

// Estado inicial del contexto
const initialState: ConfigType = {
  ...defaultConfig,
  themeDirection: "ltr", // o 'rtl', según corresponda
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

// Crear el contexto
const ConfigContext = createContext<ConfigType>(initialState);

// Definir las props para ConfigProvider
interface ConfigProviderProps {
  children: React.ReactNode;
}

// Proveedor de Configuración
function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage<ConfigType>(
    "mantis-react-next-ts-config",
    initialState
  );

  const onChangeContainer = (container: boolean) => {
    setConfig({
      ...config,
      container,
    });
  };

  const onChangeLocalization = (lang: string) => {
    setConfig({
      ...config,
      i18n: lang,
    });
  };

  const onChangeMode = (mode: string) => {
    setConfig({
      ...config,
      mode,
    });
  };

  const onChangePresetColor = (theme: string) => {
    setConfig({
      ...config,
      presetColor: theme,
    });
  };

  const onChangeDirection = (direction: "ltr" | "rtl") => {
    setConfig({ ...config, themeDirection: direction });
  };

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
      ...config,
      miniDrawer,
    });
  };

  const onChangeThemeLayout = (
    direction: "ltr" | "rtl",
    miniDrawer: boolean
  ) => {
    setConfig({
      ...config,
      miniDrawer,
      themeDirection: direction,
    });
  };

  const onChangeMenuOrientation = (layout: string) => {
    setConfig({
      ...config,
      menuOrientation: layout,
    });
  };

  const onChangeFontFamily = (fontFamily: string) => {
    setConfig({
      ...config,
      fontFamily,
    });
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
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

// Hook personalizado para consumir el contexto
function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig debe ser usado dentro de un ConfigProvider");
  }
  return context;
}

export { ConfigProvider, ConfigContext, useConfig };
