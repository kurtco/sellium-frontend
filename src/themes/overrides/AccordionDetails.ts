import { ComponentsOverrides, Theme } from "@mui/material/styles";

export default function AccordionDetails(
  theme: Theme
): ComponentsOverrides<Theme> {
  return {
    MuiAccordionDetails: {
      root: {
        padding: theme.spacing(2),
        borderTop: "1px solid",
        borderTopColor: theme.palette.secondary.light,
      },
    },
  };
}
