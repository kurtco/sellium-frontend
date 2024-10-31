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
  useTheme,
  Box,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DateSelectField from "../DateSelectedField";
import { LicenseDetailsCardLabels } from "@/constants/labels.enums";
import { formatDateToString, splitDateString } from "@/utils/commonFunctions";

export interface LicenseDetails {
  licenseType: string;
  expires: string;
  fastStar: boolean;
  state: string;
  presented: string;
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
  const theme = useTheme();
  const { month, day, year } = splitDateString(
    formatDateToString(licenseDetails.expires)
  );

  const handleDateChange = (
    fieldType: keyof LicenseDetails,
    updatedDate: string
  ) => {
    if (
      typeof licenseDetails[fieldType] === "object" &&
      licenseDetails[fieldType] !== null
    ) {
      setLicenseDetails({
        ...licenseDetails,
        [fieldType]: updatedDate,
      });
    }
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
          {LicenseDetailsCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
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
                handleDateChange("expires", e);
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
