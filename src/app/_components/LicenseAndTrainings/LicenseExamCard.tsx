"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DateSelectField from "../DateSelectedField";
import { US_STATES } from "@/constants/constant";
import { LicenseExamCardLabels } from "@/constants/labels.enums";

export interface LicenseExam {
  state: string;
  presented: {
    month: string;
    day: number;
    year: number;
  };
  approved: boolean;
}

interface LicenseExamCardProps {
  licenseExam: LicenseExam;
  setLicenseExam: (exam: LicenseExam) => void;
}

const LicenseExamCard = ({
  licenseExam,
  setLicenseExam,
}: LicenseExamCardProps) => {
  const handleDateChange = (
    fieldType: keyof LicenseExam,
    updatedDate: Partial<{ month: string; day: number; year: number }>
  ) => {
    // Validar si el campo es "presented", que es un objeto
    if (fieldType === "presented") {
      setLicenseExam({
        ...licenseExam,
        [fieldType]: { ...licenseExam.presented, ...updatedDate },
      });
    } else {
      // Si no es un campo que sea un objeto, lo actualizamos directamente
      setLicenseExam({
        ...licenseExam,
        [fieldType]: updatedDate,
      });
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {LicenseExamCardLabels.title}
        </Typography>
        <Divider sx={{ marginBottom: "22px" }} />

        <Grid2 container spacing={2}>
          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {LicenseExamCardLabels.state}
            </Typography>
            <FormControl fullWidth>
              <Select
                value={licenseExam.state}
                onChange={(e) =>
                  setLicenseExam({
                    ...licenseExam,
                    state: e.target.value,
                  })
                }
              >
                {US_STATES.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <Box display="flex" justifyContent="flex-end">
              <Typography
                variant="body2"
                color="primary"
                justifyContent="flex-end"
                sx={{ marginBottom: "10px" }}
              >
                2 {LicenseExamCardLabels.untilExamExpires}
              </Typography>
            </Box>

            <DateSelectField
              label={LicenseExamCardLabels.presentedDate}
              selectedMonth={licenseExam.presented.month}
              selectedDay={licenseExam.presented.day}
              selectedYear={licenseExam.presented.year}
              onMonthChange={(e) =>
                handleDateChange("presented", { month: e.target.value })
              }
              onDayChange={(e) =>
                handleDateChange("presented", { day: Number(e.target.value) })
              }
              onYearChange={(e) =>
                handleDateChange("presented", { year: Number(e.target.value) })
              }
            />
          </Grid2>

          <Grid2
            size={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></Grid2>

          <Grid2 size={12}>
            <FormControl component="fieldset">
              <Typography variant="body2" gutterBottom>
                {LicenseExamCardLabels.isApproved}
              </Typography>
              <RadioGroup
                row
                value={licenseExam.approved ? "Yes" : "No"}
                onChange={(e) =>
                  setLicenseExam({
                    ...licenseExam,
                    approved: e.target.value === "Yes",
                  })
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default LicenseExamCard;
