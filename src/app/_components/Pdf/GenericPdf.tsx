/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface GenericInformationProps {
  data: Record<string, any>; // Acepta cualquier objeto
}

const GenericInformation = ({ data }: GenericInformationProps) => {
  const theme = useTheme();

  const isEven = (index: number) => index % 2 === 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 2,
        borderRadius: "8px",
        boxShadow: theme.customShadows?.z1 || "0px 1px 3px rgba(0, 0, 0, 0.2)",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        height: "400px", // Ajusta la altura según tus necesidades
        overflowY: "auto", // Activa el scroll vertical
        scrollbarWidth: "thin", // Solo para navegadores compatibles (Firefox)
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.divider,
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          paddingBottom: 1,
          fontWeight: "bold",
        }}
      >
        Information
      </Typography>
      {Object.entries(data).map(([key, value], index) => (
        <Box
          key={key}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            borderRadius: "4px",
            backgroundColor: isEven(index)
              ? theme.palette.action.hover
              : theme.palette.background.default,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
              marginBottom: "4px",
              color: theme.palette.text.secondary,
            }}
          >
            {key.replace(/_/g, " ")}{" "}
          </Typography>
          <Typography>
            {Array.isArray(value)
              ? value.join(", ")
              : typeof value === "object" && value !== null
              ? JSON.stringify(value, null, 2)
              : String(value)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default GenericInformation;
