import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - TABLE FOOTER ||============================== //

export default function TableFooter(theme: Theme): ComponentsOverrides<Theme> {
  return {
    MuiTableFooter: {
      root: {
        backgroundColor: theme.palette.grey[50],
        borderTop: "2px solid",
        borderTopColor: theme.palette.divider,
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.divider,
      },
    },
  };
}
