/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { pdfExtractedData } from "@/interfaces/interfaces";
import { UploadAgentPDFCaptureLabels } from "@/constants/labels.enums";

interface GenericInformationProps {
  data: pdfExtractedData; // Se asegura de tipar con la interfaz correspondiente
  handleCloseModal: () => void;
}

const GenericInformation = ({
  data,
  handleCloseModal,
}: GenericInformationProps) => {
  const theme = useTheme();
  const formatKeyToLabel = (key: string): string => {
    return key
      .replace(/_/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

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
        Sale Information.
      </Typography>
      {Object.entries(data?.data).map(([key, value], index) => (
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
            {formatKeyToLabel(key)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 2,
          flexGrow: 1,
        }}
      >
        <Button
          variant="outlined"
          disableElevation
          onClick={handleCloseModal}
          sx={{ textTransform: "none" }}
        >
          {UploadAgentPDFCaptureLabels.CANCELBUTTON}
        </Button>
      </Box>
    </Box>
  );
};

export default GenericInformation;
