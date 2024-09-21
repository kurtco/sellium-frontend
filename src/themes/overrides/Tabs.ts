import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - TABS ||============================== //

export default function Tabs(): ComponentsOverrides<Theme> {
  return {
    MuiTabs: {
      vertical: {
        overflow: "visible",
      },
    },
  };
}
