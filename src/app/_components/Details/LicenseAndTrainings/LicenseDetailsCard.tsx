/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
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
  Box,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { LicenseDetailsCardLabels } from "@/constants/labels.enums";
import { formatDateToString, splitDateString } from "@/utils/commonFunctions";
import DateSelectField from "../../DateSelectedField";
import { LicenseAndTrainings } from "@/interfaces/interfaces";

interface LicenseDetailsCardProps {
  licenseDetails: LicenseAndTrainings;
  setLicenseDetails: (details: Partial<LicenseAndTrainings>) => void;
}

const LicenseDetailsCard = ({
  licenseDetails,
  setLicenseDetails,
}: LicenseDetailsCardProps) => {
  const theme = useTheme();
  const { month, day, year } = splitDateString(
    formatDateToString(licenseDetails.expires)
  );

  const handleDateChange = (newDate: string) => {
    setLicenseDetails({
      expires: newDate,
    });
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: "22px" }}>
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
          {LicenseDetailsCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {LicenseDetailsCardLabels.licenseType}
            </Typography>
            <FormControl fullWidth>
              <Select
                value={licenseDetails.licenseType}
                onChange={(e) =>
                  setLicenseDetails({
                    ...licenseDetails,
                    licenseType: e.target.value,
                  })
                }
                sx={{
                  color: theme.palette.text.primary,
                }}
                variant="outlined"
              >
                <MenuItem value="License 214">License 214</MenuItem>
                <MenuItem value="License 215">License 215</MenuItem>
                <MenuItem value="License 216">License 216</MenuItem>
                {/* Agrega más opciones de licencias según sea necesario */}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <DateSelectField
              label={LicenseDetailsCardLabels.dateExpires}
              selectedMonth={Number(month)}
              selectedDay={Number(day)}
              selectedYear={Number(year)}
              onDateChange={(e) => {
                handleDateChange(e);
              }}
            />
          </Grid2>

          <Grid2 size={12}>
            <FormControl component="fieldset">
              <Typography variant="body2" gutterBottom>
                {LicenseDetailsCardLabels.fast}
              </Typography>
              <RadioGroup
                row
                value={licenseDetails.fastStar}
                onChange={(e) => {
                  setLicenseDetails({
                    ...licenseDetails,
                    fastStar: e.target.value === "true",
                  });
                }}
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

export default LicenseDetailsCard;
