import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    customShadows: {
      z1: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      z1?: string;
    };
  }
}
