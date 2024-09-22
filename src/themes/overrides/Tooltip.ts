import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - TOOLTIP ||============================== //

export default function Tooltip(theme: Theme): ComponentsOverrides<Theme> {
  return {
    MuiTooltip: {
      tooltip: {
        color: theme.palette.background.paper,
      },
    },
  };
}
