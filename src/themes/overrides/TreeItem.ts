import { ComponentsOverrides, Theme } from "@mui/material/styles";

// ==============================|| OVERRIDES - TREE ITEM ||============================== //

export default function TreeItem(): ComponentsOverrides<Theme> {
  return {
    MuiTreeItem: {
      content: {
        padding: 8,
      },
      iconContainer: {
        "& svg": {
          fontSize: "0.625rem",
        },
      },
    },
  };
}
