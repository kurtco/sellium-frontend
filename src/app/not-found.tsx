"use client";

import { NoFoundLabels } from "@/constants/labels.enums";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 2,
          fontWeight: 700,
          color: theme.palette.text.primary,
        }}
      >
        {NoFoundLabels.title}
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        {NoFoundLabels.message}
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: 4, color: theme.palette.text.secondary }}
      >
        {NoFoundLabels.message2}
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push("/?openmodal=true")}
        sx={{
          padding: "10px 20px",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          textTransform: "none",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        {NoFoundLabels.button}
      </Button>
    </Box>
  );
}
