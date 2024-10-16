"use client";
import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const JobDependenciesCard = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Dependencies
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Recruiter"
              defaultValue="Francisco Velázquez Rojas"
              variant="outlined"
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Recruiter Code"
              defaultValue="A0563"
              variant="outlined"
              disabled
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Leader"
              defaultValue="Marcel & Isa Macias"
              variant="outlined"
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Leader Code"
              defaultValue="GFI09"
              variant="outlined"
              disabled
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};
export default JobDependenciesCard;
