import { useContext } from "react";
import { ThemeMode } from "@/constants/config.enum";
import { ConfigContext } from "@/context/ConfigContext";

// Define the expected structure of your ConfigContext
interface ConfigContextType {
  mode: ThemeMode;
  presetColor: string; // Añadimos presetColor aquí
  toggleThemeMode: () => void;
}

// ==============================|| CONFIG - HOOKS ||============================== //

export default function useConfig(): ConfigContextType {
  return useContext(ConfigContext) as unknown as ConfigContextType;
}
