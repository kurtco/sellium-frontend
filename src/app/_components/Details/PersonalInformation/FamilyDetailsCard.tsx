"use client";
import React from "react";
import { Card, CardContent, TextField, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PersonalInformation } from "@/interfaces/interfaces";
import { FamilyDetailsCardLabels } from "@/constants/labels.enums";

interface FamilyDetailsCardProps {
  familyDetails: PersonalInformation;
  setFamilyDetails: (details: Partial<PersonalInformation>) => void;
}

const FamilyDetailsCard = ({
  familyDetails,
  setFamilyDetails,
}: FamilyDetailsCardProps) => {
  return (
    <Card variant="outlined">
      <Box
        sx={{
          marginBottom: 2,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 1,
          padding: "16px 0px 16px 20px ",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {FamilyDetailsCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid size={12} sx={{ marginBottom: "10px" }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {FamilyDetailsCardLabels.spouseName}
          </Typography>
          <TextField
            fullWidth
            value={familyDetails.spouseName}
            onChange={(e) =>
              setFamilyDetails({
                ...familyDetails,
                spouseName: e.target.value,
              })
            }
            variant="outlined"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FamilyDetailsCard;
