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
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DateSelectField from "../../DateSelectedField";

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
            Job Details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Position"
                value={jobDetails.position}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, position: e.target.value })
                }
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={12}>
              <DateSelectField
                label="Promotion Date"
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
                label="Personal Code"
                value={jobDetails.personalCode}
                variant="outlined"
                disabled
              />
            </Grid2>

            <Grid2 size={12}>
              <DateSelectField
                label="Part of Company Since"
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
              <TextField
                fullWidth
                label="Appointed"
                value={jobDetails.appointed}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, appointed: e.target.value })
                }
                variant="outlined"
              />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobDetailsCard;
