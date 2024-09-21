import {
  ComponentsOverrides,
  ComponentsProps,
  Theme,
} from "@mui/material/styles";
import RightOutlined from "@ant-design/icons/RightOutlined";

// ==============================|| OVERRIDES - ACCORDION SUMMARY ||============================== //

export default function AccordionSummary(theme: Theme): {
  MuiAccordionSummary: {
    defaultProps: ComponentsProps["MuiAccordionSummary"];
    styleOverrides: ComponentsOverrides<Theme>["MuiAccordionSummary"];
  };
} {
  return {
    MuiAccordionSummary: {
      defaultProps: {
        expandIcon: <RightOutlined style={{ fontSize: "0.75rem" }} />,
      },
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.secondary.light,
          flexDirection: "row-reverse",
          minHeight: 46,
        },
        expandIconWrapper: {
          "&.Mui-expanded": {
            transform: "rotate(90deg)",
          },
        },
        content: {
          marginTop: theme.spacing(1.25),
          marginBottom: theme.spacing(1.25),
          marginLeft: theme.spacing(1),
        },
      },
    },
  };
}
