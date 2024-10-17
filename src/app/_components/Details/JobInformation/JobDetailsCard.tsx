/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DateSelectField from "../../DateSelectedField";
import { JobDetailsCardLabels } from "@/constants/labels.enums";
import { insuranceCompanies } from "@/constants/constant";

interface JobDetailsCardProps {
  jobDetails: {
    position: string;
    promotionDate: {
      month: string;
      day: number;
      year: number;
    };
    personalCode: string;
    companyDate: {
      month: string;
      day: number;
      year: number;
    };
    appointed: string;
  };
  setJobDetails: (details: any) => void;
}

const JobDetailsCard = ({ jobDetails, setJobDetails }: JobDetailsCardProps) => {
  const handleDateChange = (
    fieldType: keyof typeof jobDetails,
    updatedDate: Partial<{ month: string; day: number; year: number }>
  ) => {
    setJobDetails((prevDetails: any) => ({
      ...prevDetails,
      [fieldType]: { ...prevDetails[fieldType], ...updatedDate },
    }));
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {JobDetailsCardLabels.title}
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label={JobDetailsCardLabels.positionField}
                value={jobDetails.position}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, position: e.target.value })
                }
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={12}>
              <DateSelectField
                label={JobDetailsCardLabels.promotionDateField}
                selectedMonth={jobDetails.promotionDate.month}
                selectedDay={jobDetails.promotionDate.day}
                selectedYear={jobDetails.promotionDate.year}
                onMonthChange={(e) =>
                  handleDateChange("promotionDate", { month: e.target.value })
                }
                onDayChange={(e) =>
                  handleDateChange("promotionDate", {
                    day: Number(e.target.value),
                  })
                }
                onYearChange={(e) =>
                  handleDateChange("promotionDate", {
                    year: Number(e.target.value),
                  })
                }
              />
            </Grid2>

            <Grid2 size={12}>
              <TextField
                fullWidth
                label={JobDetailsCardLabels.personalCodeField}
                value={jobDetails.personalCode}
                variant="outlined"
                disabled
              />
            </Grid2>

            <Grid2 size={12}>
              <DateSelectField
                label={JobDetailsCardLabels.sinceInCompany}
                selectedMonth={jobDetails.companyDate.month}
                selectedDay={jobDetails.companyDate.day}
                selectedYear={jobDetails.companyDate.year}
                onMonthChange={(e) =>
                  handleDateChange("companyDate", { month: e.target.value })
                }
                onDayChange={(e) =>
                  handleDateChange("companyDate", {
                    day: Number(e.target.value),
                  })
                }
                onYearChange={(e) =>
                  handleDateChange("companyDate", {
                    year: Number(e.target.value),
                  })
                }
              />
            </Grid2>

            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel>{JobDetailsCardLabels.appointedField}</InputLabel>
                <Select
                  value={jobDetails.appointed}
                  onChange={(e) =>
                    setJobDetails({ ...jobDetails, appointed: e.target.value })
                  }
                  label={JobDetailsCardLabels.appointedField}
                >
                  {insuranceCompanies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobDetailsCard;
