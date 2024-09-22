import { ReactNode, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// project import

import Palette from "./palette";
import Typography from "./typography";
import CustomShadows from "./shadows";

import { NextAppDirEmotionCacheProvider } from "./theme/emotionCache";
import useConfig from "@/hooks/useConfig";

// types
interface ThemeCustomizationProps {
  children: ReactNode;
}

// ==============================|| DEFAULT THEME - MAIN ||============================== //

export default function ThemeCustomization({
  children,
}: ThemeCustomizationProps) {
  const { themeDirection, mode, presetColor, fontFamily } = useConfig();

  const theme = useMemo(() => Palette(mode, presetColor), [mode, presetColor]);

  const themeTypography = useMemo(() => Typography(fontFamily), [fontFamily]);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={themes}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
