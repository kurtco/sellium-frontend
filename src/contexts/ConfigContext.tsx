// src/context/ConfigContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "@/hooks/useLocalStorage";
import defaultConfig from "@/constants/constant";

// Definir la interfaz de configuración
interface ConfigType {
  container: boolean;
  i18n: string;
  mode: string;
  presetColor: string;
  themeDirection: string;
  miniDrawer: boolean;
  themeLayout: string;
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

// Estado inicial del contexto
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

// Crear el contexto
const ConfigContext = createContext<ConfigType>(initialState);

// Definir las props del ConfigProvider
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
    setConfig({ ...config, container });
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

  const onChangeDirection = (direction: string) => {
    setConfig({ ...config, themeDirection: direction });
  };

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
      ...config,
      miniDrawer,
    });
  };

  const onChangeThemeLayout = (direction: string, miniDrawer: boolean) => {
    setConfig({ ...config, miniDrawer, themeDirection: direction });
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

ConfigProvider.propTypes = { children: PropTypes.node };
