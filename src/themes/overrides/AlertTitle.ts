import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - ALERT TITLE ||============================== //

export default function AlertTitle(): ComponentsOverrides<Theme> {
  return {
    MuiAlertTitle: {
      root: {
        marginBottom: 4,
        marginTop: 0,
        fontWeight: 400,
      },
    },
  };
}
