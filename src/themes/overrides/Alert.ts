import getColors from "@/utils/getColors";
import { alpha, Theme } from "@mui/material/styles";
import { ComponentsOverrides } from "@mui/material/styles";

// ==============================|| ALERT - COLORS ||============================== //

function getColorStyle({ color, theme }: { color: string; theme: Theme }) {
  const colors = getColors(theme, color);
  const { light, main } = colors;

  return {
    borderColor: alpha(light, 0.5),
    backgroundColor: light,
    "& .MuiAlert-icon": {
      color: main,
    },
  };
}

// ==============================|| OVERRIDES - ALERT ||============================== //

export default function Alert(theme: Theme): ComponentsOverrides<Theme> {
  return {
    MuiAlert: {
      root: {
        color: theme.palette.text.primary,
        fontSize: "0.875rem",
      },
      icon: {
        fontSize: "1rem",
      },
      message: {
        padding: 0,
        marginTop: 3,
      },
      filled: {
        color: theme.palette.grey["A100"],
      },
      standard: {
        padding: "10px 16px",
        border: "1px solid",
        "&.MuiAlert-borderPrimary": getColorStyle({ color: "primary", theme }),
        "&.MuiAlert-borderSecondary": getColorStyle({
          color: "secondary",
          theme,
        }),
        "&.MuiAlert-borderError": getColorStyle({ color: "error", theme }),
        "&.MuiAlert-borderSuccess": getColorStyle({ color: "success", theme }),
        "&.MuiAlert-borderInfo": getColorStyle({ color: "info", theme }),
        "&.MuiAlert-borderWarning": getColorStyle({ color: "warning", theme }),
      },
      action: {
        "& .MuiButton-root": {
          padding: 2,
          height: "auto",
          fontSize: "0.75rem",
          marginTop: -2,
        },
        "& .MuiIconButton-root": {
          width: "auto",
          height: "auto",
          padding: 2,
          marginRight: 6,
          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        },
      },
    },
  };
}
