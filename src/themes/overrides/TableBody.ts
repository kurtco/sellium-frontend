import { ComponentsOverrides, Theme } from "@mui/material/styles";

export default function TableBody(theme: Theme): ComponentsOverrides<Theme> {
  return {
    MuiTableBody: {
      root: {
        "&.striped .MuiTableRow-root": {
          "&:nth-of-type(even)": {
            backgroundColor: theme.palette.grey[50],
          },
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
          },
        },
        "& .MuiTableRow-root": {
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
    },
  };
}
