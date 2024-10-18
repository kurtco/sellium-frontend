/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
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
import { LicenseDetailsCardLabels } from "@/constants/labels.enums";

export interface LicenseDetails {
  licenseType: string;
  expires: {
    month: string;
    day: number;
    year: number;
  };
  fastStar: boolean;
  state: string;
  presented: {
    month: string;
    day: number;
    year: number;
  };
  approved: boolean;
}

interface LicenseDetailsCardProps {
  licenseDetails: LicenseDetails;
  setLicenseDetails: (details: LicenseDetails) => void;
}

const LicenseDetailsCard = ({
  licenseDetails,
  setLicenseDetails,
}: LicenseDetailsCardProps) => {
  const handleDateChange = (
    fieldType: keyof LicenseDetails,
    updatedDate: Partial<{ month: string; day: number; year: number }>
  ) => {
    // Check if the fieldType is an object (like `expires` or `presented`) before using the spread operator
    if (
      typeof licenseDetails[fieldType] === "object" &&
      licenseDetails[fieldType] !== null
    ) {
      setLicenseDetails({
        ...licenseDetails,
        [fieldType]: { ...licenseDetails[fieldType], ...updatedDate },
      });
    }
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: "22px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {LicenseDetailsCardLabels.title}
        </Typography>
        <Divider sx={{ marginBottom: "22px" }} />

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
              selectedMonth={licenseDetails.expires.month}
              selectedDay={licenseDetails.expires.day}
              selectedYear={licenseDetails.expires.year}
              onMonthChange={(e) =>
                handleDateChange("expires", { month: e.target.value })
              }
              onDayChange={(e) =>
                handleDateChange("expires", { day: Number(e.target.value) })
              }
              onYearChange={(e) =>
                handleDateChange("expires", { year: Number(e.target.value) })
              }
            />
          </Grid2>

          <Grid2 size={12}>
            <FormControl component="fieldset">
              <Typography variant="body2" gutterBottom>
                {LicenseDetailsCardLabels.fast}
              </Typography>
              <RadioGroup
                row
                value={licenseDetails.fastStar ? "Yes" : "No"}
                onChange={(e) =>
                  setLicenseDetails({
                    ...licenseDetails,
                    fastStar: e.target.value === "Yes",
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

export default LicenseDetailsCard;
