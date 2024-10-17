"use client";
import React from "react";
import { Card, CardContent, TextField, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DateSelectField from "../../DateSelectedField";
import { PersonalDetails } from "@/interfaces/interfaces";
import { PersonalDetailsCardLabels } from "@/constants/labels.enums";

interface PersonalDetailsCardProps {
  personalDetails: PersonalDetails;
  setPersonalDetails: React.Dispatch<React.SetStateAction<PersonalDetails>>;
}

const PersonalDetailsCard = ({
  personalDetails,
  setPersonalDetails,
}: PersonalDetailsCardProps) => {
  const handleDateChange = (
    updatedDate: Partial<{ month: string; day: number; year: number }>
  ) => {
    setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      birthDate: { ...prevDetails.birthDate, ...updatedDate },
    }));
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
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
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
          </Grid2>
          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
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
          </Grid2>
          <Grid2 size={12} sx={{ marginBottom: "20px" }}>
            <DateSelectField
              label={PersonalDetailsCardLabels.birthDate}
              selectedMonth={personalDetails.birthDate.month}
              selectedDay={personalDetails.birthDate.day}
              selectedYear={personalDetails.birthDate.year}
              onMonthChange={(e) => handleDateChange({ month: e.target.value })}
              onDayChange={(e) =>
                handleDateChange({ day: Number(e.target.value) })
              }
              onYearChange={(e) =>
                handleDateChange({ year: Number(e.target.value) })
              }
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsCard;
