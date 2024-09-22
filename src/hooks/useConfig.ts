// src/hooks/useConfig.ts
"use client";

import { useContext } from "react";
import { ConfigContext } from "@/context/ConfigContext";

export default function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig debe ser usado dentro de un ConfigProvider");
  }
  return context;
}
