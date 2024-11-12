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
import { PersonalInformation } from "@/interfaces/interfaces";
import { useTabContext } from "@/context/TabContext";

interface PersonalInformationCardProps {
  personalDetails: PersonalInformation;
}

const PersonalInformationCard = ({
  personalDetails,
}: PersonalInformationCardProps) => {
  const { setSelectedTab } = useTabContext();

  const handleEditClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setSelectedTab(1);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {PersonalInformationCardLabels.title}
          </Typography>
          <Link href="#" variant="body2" onClick={handleEditClick}>
            {PersonalInformationCardLabels.edit}
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.fullName}
            </Typography>
            <Typography>{`${personalDetails.firstName} ${personalDetails.lastName}`}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.birthDate}
            </Typography>
            <Typography>{personalDetails.dateOfBirth}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.phoneNumber}
            </Typography>
            <Typography>{`${personalDetails.phoneCode} ${personalDetails.phoneNumber}`}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.email}
            </Typography>
            <Typography>{personalDetails.email}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.homeAddress}
            </Typography>
            <Typography>{personalDetails.homeAddress}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.businessAddress}
            </Typography>
            <Typography>{personalDetails.businessAddress}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.areYouInsured}
            </Typography>
            <Typography>{personalDetails.insured ? "Yes" : "No"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {PersonalInformationCardLabels.productType}
            </Typography>
            <Typography>{personalDetails.productType}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
