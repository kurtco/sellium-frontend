// material-ui
import { alpha, createTheme, PaletteMode } from "@mui/material/styles";

// third-party
import { presetDarkPalettes, presetPalettes } from "@ant-design/colors";

// project import
import ThemeOption from "./theme";
import { ThemeMode } from "@/constants/config.enum";
import { Colors } from "@/interfaces/interfaces";

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export default function Palette(mode: PaletteMode, presetColor: string) {
  let greyPrimary = [
    "#ffffff",
    "#fafafa",
    "#f5f5f5",
    "#f0f0f0",
    "#d9d9d9",
    "#bfbfbf",
    "#8c8c8c",
    "#595959",
    "#262626",
    "#141414",
    "#000000",
  ];
  let greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
  let greyConstant = ["#fafafb", "#e6ebf1"];

  if (mode === ThemeMode.DARK) {
    greyPrimary = [
      "#000000",
      "#141414",
      "#1e1e1e",
      "#595959",
      "#8c8c8c",
      "#bfbfbf",
      "#d9d9d9",
      "#f0f0f0",
      "#f5f5f5",
      "#fafafa",
      "#ffffff",
    ];
    greyAscent = ["#fafafa", "#bfbfbf", "#434343", "#1f1f1f"];
    greyConstant = ["#121212", "#d3d8db"];
  }

  const colors: Colors = {
    blue:
      mode === ThemeMode.DARK ? presetDarkPalettes.blue : presetPalettes.blue,
    red: mode === ThemeMode.DARK ? presetDarkPalettes.red : presetPalettes.red,
    gold:
      mode === ThemeMode.DARK ? presetDarkPalettes.gold : presetPalettes.gold,
    cyan:
      mode === ThemeMode.DARK ? presetDarkPalettes.cyan : presetPalettes.cyan,
    green:
      mode === ThemeMode.DARK ? presetDarkPalettes.green : presetPalettes.green,
    grey: [...greyPrimary, ...greyAscent, ...greyConstant],
  };

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];
  const mappedMode: ThemeMode =
    mode === "dark" ? ThemeMode.DARK : ThemeMode.LIGHT;

  const paletteColor = ThemeOption(colors, presetColor, mappedMode);

  return createTheme({
    palette: {
      mode,
      common: {
        black: "#000",
        white: "#fff",
      },
      ...paletteColor,
      text: {
        primary:
          mode === ThemeMode.DARK
            ? alpha(paletteColor.grey[900], 0.87)
            : paletteColor.grey[700],
        secondary:
          mode === ThemeMode.DARK
            ? alpha(paletteColor.grey[900], 0.45)
            : paletteColor.grey[500],
        disabled:
          mode === ThemeMode.DARK
            ? alpha(paletteColor.grey[900], 0.1)
            : paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider:
        mode === ThemeMode.DARK
          ? alpha(paletteColor.grey[900], 0.05)
          : paletteColor.grey[200],
      background: {
        paper:
          mode === ThemeMode.DARK
            ? paletteColor.grey[100]
            : paletteColor.grey[0],
        default: paletteColor.grey.A50,
      },
    },
    customShadows: {
      z1: "0px 1px 3px rgba(0, 0, 0, 0.2)",
    },
  });
}
