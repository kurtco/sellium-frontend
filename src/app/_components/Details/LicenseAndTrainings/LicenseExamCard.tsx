"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

import { US_STATES } from "@/constants/constant";
import { LicenseExamCardLabels } from "@/constants/labels.enums";
import { formatDateToString, splitDateString } from "@/utils/commonFunctions";
import { LicenseAndTrainings } from "@/interfaces/interfaces";
import DateSelectField from "../../DateSelectedField";

interface LicenseExamCardProps {
  licenseExam: LicenseAndTrainings;
  setLicenseExam: (details: Partial<LicenseAndTrainings>) => void;
}

const LicenseExamCard = ({
  licenseExam,
  setLicenseExam,
}: LicenseExamCardProps) => {
  const theme = useTheme();
  const { month, day, year } = splitDateString(
    formatDateToString(licenseExam.presented)
  );

  const handleDateChange = (newDate: string) => {
    setLicenseExam({
      presented: newDate,
    });
  };

  return (
    <Card variant="outlined">
      <Box
        sx={{
          marginBottom: "22px",
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 1,
          padding: "16px 0px 16px 20px ",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {LicenseExamCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
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
                sx={{
                  color: theme.palette.text.primary,
                }}
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
              selectedMonth={Number(month)}
              selectedDay={Number(day)}
              selectedYear={Number(year)}
              onDateChange={(e) => {
                handleDateChange(e);
              }}
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
                value={licenseExam.approved ? "true" : "false"}
                onChange={(e) =>
                  setLicenseExam({
                    ...licenseExam,
                    approved: e.target.value === "true",
                  })
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default LicenseExamCard;
