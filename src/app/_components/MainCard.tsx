"use client";

import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// project-import
import { ThemeMode } from "../../config";

const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode;
  subheader?: React.ReactNode | string;
  content?: boolean;
  contentSX?: object;
  darkTitle?: boolean;
  divider?: boolean;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: object;
  title?: React.ReactNode | string;
  codeHighlight?: boolean;
  codeString?: string;
  modal?: boolean;
  others?: unknown;
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight = false,
      codeString,
      modal = false,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    boxShadow =
      theme.palette.mode === ThemeMode.DARK ? boxShadow || true : boxShadow;

    return (
      <Card
        sx={{
          position: "relative",
          border: border ? "1px solid" : "none",
          borderRadius: 1,
          borderColor:
            theme.palette.mode === ThemeMode.DARK ? "divider" : "grey.A800",
          boxShadow:
            boxShadow && (!border || theme.palette.mode === ThemeMode.DARK)
              ? shadow || theme.customShadows.z1
              : "none",
          ":hover": {
            boxShadow: boxShadow ? shadow || theme.customShadows.z1 : "none",
          },
          ...(theme.palette.mode === ThemeMode.DARK && {
            backgroundImage: "none",
          }),
          ...(codeHighlight && {
            "& pre": {
              margin: 0,
              padding: "12px !important",
              fontFamily: theme.typography.fontFamily,
              fontSize: "0.75rem",
            },
          }),
          ...(modal && {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: `calc( 100% - 50px)`, sm: "auto" },
            "& .MuiCardContent-root": {
              overflowY: "auto",
              minHeight: "auto",
              maxHeight: `calc(100vh - 200px)`,
            },
          }),
          ...sx,
        }}
        ref={ref}
        {...others}
      >
        {!darkTitle && title && (
          <CardHeader
            sx={headerSX}
            titleTypographyProps={{ variant: "subtitle1" }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary}
          />
        )}

        {title && divider && <Divider />}

        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}

        {codeString && (
          <>
            <Divider sx={{ borderStyle: "dashed" }} />
            {/* <Highlighter
              codeString={codeString}
              codeHighlight={codeHighlight}
            /> */}
          </>
        )}
      </Card>
    );
  }
);

MainCard.displayName = "MainCard";

export default MainCard;
