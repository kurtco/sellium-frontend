import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - TABLE HEAD ||============================== //

export default function TableHead(theme: Theme): ComponentsOverrides<Theme> {
  return {
    MuiTableHead: {
      root: {
        backgroundColor: theme.palette.grey[50],
        borderTop: "1px solid",
        borderTopColor: theme.palette.divider,
        borderBottom: "2px solid",
        borderBottomColor: theme.palette.divider,
      },
    },
  };
}
