import "@mui/material/styles";

declare module "@mui/material/styles" {
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
