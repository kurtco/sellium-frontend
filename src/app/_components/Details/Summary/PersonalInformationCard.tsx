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

const PersonalInformationCard = () => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Personal Information</Typography>
          <Link href="#" variant="body2">
            Edit
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Full Name
            </Typography>
            <Typography>Oswely Urbano</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Date of Birth
            </Typography>
            <Typography>09/29/1980</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography>+1 865 423 9581</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Email
            </Typography>
            <Typography>oswelyurbano@gmail.com</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Home Address
            </Typography>
            <Typography>299 MILLER RD apt 124, MAULDIN, SC 29662</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Business Address
            </Typography>
            <Typography>299 MILLER RD apt 124, MAULDIN, SC 29662</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Insured with the Company?
            </Typography>
            <Typography>Yes</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              Product Type
            </Typography>
            <Typography>IUL</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
