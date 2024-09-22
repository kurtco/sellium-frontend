import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography(): ComponentsOverrides<Theme> {
  return {
    MuiTypography: {
      gutterBottom: {
        marginBottom: 12,
      },
    },
  };
}
