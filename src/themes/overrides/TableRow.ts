import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - TABLE ROW ||============================== //

export default function TableRow(): ComponentsOverrides<Theme> {
  return {
    MuiTableRow: {
      root: {
        "&:last-of-type": {
          "& .MuiTableCell-root": {
            borderBottom: "none",
          },
        },
        "& .MuiTableCell-root": {
          "&:last-of-type": {
            paddingRight: 24,
          },
          "&:first-of-type": {
            paddingLeft: 24,
          },
        },
      },
    },
  };
}
