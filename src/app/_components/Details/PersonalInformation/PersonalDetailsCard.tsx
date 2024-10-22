"use client";
import React from "react";
import { Card, CardContent, TextField, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { PersonalInformation } from "@/interfaces/interfaces";
import { PersonalDetailsCardLabels } from "@/constants/labels.enums";
import DateSelectField from "../../DateSelectedField";
import { formatDateToString, splitDateString } from "@/utils/commonFunctions";

interface PersonalDetailsCardProps {
  personalDetails: PersonalInformation;
  setPersonalDetails: (details: Partial<PersonalInformation>) => void;
}

const PersonalDetailsCard = ({
  personalDetails,
  setPersonalDetails,
}: PersonalDetailsCardProps) => {
  const { month, day, year } = splitDateString(
    formatDateToString(personalDetails.dateOfBirth)
  );

  const handleDateChange = (newDate: string) => {
    console.log("new date PersonalDetailsCard -   ", newDate);
    setPersonalDetails({
      dateOfBirth: newDate,
    });
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: "22px" }}>
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
          {PersonalDetailsCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {PersonalDetailsCardLabels.firstName}
            </Typography>
            <TextField
              fullWidth
              value={personalDetails.firstName}
              onChange={(e) =>
                setPersonalDetails({
                  ...personalDetails,
                  firstName: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid>
          <Grid size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {PersonalDetailsCardLabels.lastName}
            </Typography>
            <TextField
              fullWidth
              value={personalDetails.lastName}
              onChange={(e) =>
                setPersonalDetails({
                  ...personalDetails,
                  lastName: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid>
          <Grid size={12} sx={{ marginBottom: "20px" }}>
            <DateSelectField
              label={PersonalDetailsCardLabels.birthDate}
              selectedMonth={Number(month)}
              selectedDay={Number(day)}
              selectedYear={Number(year)}
              onDateChange={(e) => {
                handleDateChange(e);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsCard;
