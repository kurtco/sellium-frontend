import "@mui/material/styles";

// Extender la interfaz `PaletteColor` para agregar la propiedad `lighter`
declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
  }

  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
  }

  interface PaletteOptions {
    primary?: PaletteColor;
    secondary?: PaletteColor;
    error?: PaletteColor;
    warning?: PaletteColor;
    info?: PaletteColor;
    success?: PaletteColor;
  }

  // Mantener las propiedades de customShadows
  interface Theme {
    customShadows: {
      z1: string;
      secondary?: string;
      error?: string;
      warning?: string;
      info?: string;
      success?: string;
      primaryButton?: string;
      secondaryButton?: string;
      errorButton?: string;
      warningButton?: string;
      infoButton?: string;
      successButton?: string;
      primary?: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      z1?: string;
      secondary?: string;
      error?: string;
      warning?: string;
      info?: string;
      success?: string;
      primaryButton?: string;
      secondaryButton?: string;
      errorButton?: string;
      warningButton?: string;
      infoButton?: string;
      successButton?: string;
      primary?: string;
    };
  }
}
