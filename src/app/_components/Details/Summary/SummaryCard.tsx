"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Box,
  LinearProgress,
  Link,
  useTheme,
} from "@mui/material";
import { SummaryCardComponentLabels } from "@/constants/labels.enums";
import { monthsList } from "@/constants/constant";

const SummaryCard = () => {
  const theme = useTheme();

  return (
    <Card variant="outlined">
      <CardContent>
        {/* Avatar and Agent Information */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // Cambia a columna en dispositivos móviles
          alignItems="center"
          mb={2}
          gap={2} // Añade un espacio entre los elementos para un diseño más limpio
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.grey[200],
              width: 56,
              height: 56,
            }}
          >
            OU
          </Avatar>
          <Box textAlign={{ xs: "center", md: "left" }} flex={1}>
            <Typography variant="h6">Oswely Urbano</Typography>
            <Typography variant="body2" color="textSecondary">
              Representative Licensed
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              A0260
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Leader and Recruiter Information */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // Cambia a columna en móviles y fila en pantallas más grandes
          gap={2}
          mb={2}
        >
          <Box flex={1} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="body2" color="textSecondary">
              {SummaryCardComponentLabels.leader}
            </Typography>
            <Typography variant="body2">Marcel & Isa Macias</Typography>
            <Typography variant="subtitle1">GFI09</Typography>
          </Box>
          <Box flex={1} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="body2" color="textSecondary">
              {SummaryCardComponentLabels.recruiter}
            </Typography>
            <Typography variant="body2">Francisco Velázquez Rojas</Typography>
            <Typography variant="subtitle1">A0563</Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Agents Recruited & Sales */}
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: "column", md: "row" }} // Se apila en columna para móviles
          textAlign={{ xs: "center", md: "left" }}
          mb={1}
        >
          <Typography variant="subtitle1">Agents Recruited & Sales</Typography>
          <Link href="#" variant="body2">
            {SummaryCardComponentLabels.recruiter}
          </Link>
        </Box>
        <Grid container spacing={1} mb={2}>
          <Grid size={6}>
            <Typography variant="h6">2</Typography>
            <Typography variant="body2" color="textSecondary">
              {SummaryCardComponentLabels.agents}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6">3</Typography>
            <Typography variant="body2" color="textSecondary">
              {SummaryCardComponentLabels.polices}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="primary">
              1 {SummaryCardComponentLabels.agentsUpgrade}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      {/* Monthly Points */}
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: "column", md: "row" }} // Responsive flex-direction
          textAlign={{ xs: "center", md: "left" }}
          mb={1}
        >
          <Typography variant="subtitle1">Monthly Points 2024</Typography>
          <Link href="#" variant="body2">
            {SummaryCardComponentLabels.edit}
          </Link>
        </Box>
        <Grid container spacing={1}>
          {monthsList.map((month, index) => (
            <Grid size={12} key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{ xs: "column", md: "row" }} // Responsive layout for mobile
                textAlign={{ xs: "center", md: "left" }}
                gap={1} // Espaciado entre elementos en dispositivos móviles
              >
                <Typography variant="body2">{month}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.random() * 100}
                  sx={{ width: { xs: "100%", md: "60%" }, mx: 2 }}
                />
                <Typography variant="body2">{`${Math.floor(
                  Math.random() * 30
                )}%`}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
          6,113 {SummaryCardComponentLabels.associateUpgrade}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
