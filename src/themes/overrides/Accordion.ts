import {
  ComponentsOverrides,
  ComponentsProps,
  Theme,
} from "@mui/material/styles";

export default function Accordion(theme: Theme): {
  MuiAccordion: {
    defaultProps: ComponentsProps["MuiAccordion"];
    styleOverrides: ComponentsOverrides<Theme>["MuiAccordion"];
  };
} {
  return {
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        square: true,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: "1px solid",
          borderColor: theme.palette.secondary.light,
          "&:not(:last-child)": {
            borderBottom: 0,
          },
          "&:before": {
            display: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.secondary.light,
          },
        },
      },
    },
  };
}
