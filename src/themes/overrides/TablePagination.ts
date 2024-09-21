import { ComponentsOverrides, Theme } from "@mui/material/styles";

export default function TablePagination(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  theme: Theme
): ComponentsOverrides<Theme> {
  return {
    MuiTablePagination: {
      selectLabel: {
        style: {
          fontSize: "0.875rem",
        },
      },
      displayedRows: {
        style: {
          fontSize: "0.875rem",
        },
      },
    },
  };
}
