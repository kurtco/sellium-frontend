import React from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { defaultBlueColor } from "@/constants/constant";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({ text }: LoadingSpinnerProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress
        sx={{
          color: defaultBlueColor,
          marginBottom: 2,
        }}
        thickness={5}
        size={50}
      />
      {text && (
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.grey[700],
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
