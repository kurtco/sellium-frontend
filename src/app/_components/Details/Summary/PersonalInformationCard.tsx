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
import { PersonalInformationCardLabels } from "@/constants/labels.enums";

const PersonalInformationCard = () => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {PersonalInformationCardLabels.title}
          </Typography>
          <Link href="#" variant="body2">
            {PersonalInformationCardLabels.edit}
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.fullName}
            </Typography>
            <Typography>Oswely Urbano</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.birthDate}
            </Typography>
            <Typography>09/29/1980</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.phoneNumber}
            </Typography>
            <Typography>+1 865 423 9581</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.email}
            </Typography>
            <Typography>oswelyurbano@gmail.com</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.homeAddress}
            </Typography>
            <Typography>299 MILLER RD apt 124, MAULDIN, SC 29662</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.businessAddress}
            </Typography>
            <Typography>299 MILLER RD apt 124, MAULDIN, SC 29662</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.areYouInsured}
            </Typography>
            <Typography>Yes</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.productType}
            </Typography>
            <Typography>IUL</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
