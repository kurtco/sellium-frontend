"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  Divider,
} from "@mui/material";
import PersonalInformationCard from "./PersonalInformationCard";

const DetailedInformation = () => {
  return (
    <Box sx={{ margin: 0, padding: 2 }}>
      {/* Personal Information Section */}
      <PersonalInformationCard />

      {/* Job Information Section */}
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }} // Responsive layout for mobile and larger screens
            justifyContent="space-between"
            alignItems="center"
            textAlign={{ xs: "center", md: "left" }}
            gap={2} // Gap for spacing in mobile view
          >
            <Typography variant="h6">Job Information</Typography>
            <Link href="#" variant="body2">
              Edit
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="textSecondary">
                Promotion Date
              </Typography>
              <Typography>September 29, 2024</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="textSecondary">
                Part of the company since
              </Typography>
              <Typography>September 29, 2020</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* License & Trainings Section */}
      <Card variant="outlined">
        <CardContent>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }} // Responsive layout for mobile and larger screens
            justifyContent="space-between"
            alignItems="center"
            textAlign={{ xs: "center", md: "left" }}
            gap={2} // Gap for spacing in mobile view
          >
            <Typography variant="h6">License & Trainings</Typography>
            <Link href="#" variant="body2">
              Edit
            </Link>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="textSecondary">
                License
              </Typography>
              <Typography>License 214</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="body2" color="textSecondary">
                License Expires
              </Typography>
              <Typography>November 14, 2024</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetailedInformation;
