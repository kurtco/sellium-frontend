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
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DateSelectField from "../../DateSelectedField";
import { JobDetailsCardLabels } from "@/constants/labels.enums";
import { insuranceCompanies } from "@/constants/constant";
import { formatDateToString, splitDateString } from "@/utils/commonFunctions";

interface JobDetailsCardProps {
  jobDetails: {
    position: string;
    promotionDate: string;
    personalCode: string;
    companyDate: string;
    appointed: string;
    eo: boolean;
  };
  setJobDetails: (details: any) => void;
}

const JobDetailsCard = ({ jobDetails, setJobDetails }: JobDetailsCardProps) => {
  const {
    month: promoMonth,
    day: promoDay,
    year: promoYear,
  } = splitDateString(formatDateToString(jobDetails.promotionDate));

  const {
    month: companyMonth,
    day: companyDay,
    year: companyYear,
  } = splitDateString(formatDateToString(jobDetails.companyDate));

  const handleDateChange = (newDate: string) => {
    console.log("new date JobDetailsCard -   ", newDate);

    setJobDetails((prevDetails: any) => ({
      ...prevDetails,
      companyDate: newDate,
    }));
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {JobDetailsCardLabels.title}
          </Typography>
          <Divider sx={{ marginBottom: "22px" }} />

          <Grid2 container spacing={2}>
            <Grid2 size={12} sx={{ marginBottom: "22px" }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {JobDetailsCardLabels.positionField}
              </Typography>
              <TextField
                fullWidth
                value={jobDetails.position}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, position: e.target.value })
                }
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={12} sx={{ marginBottom: "22px" }}>
              <DateSelectField
                label={JobDetailsCardLabels.promotionDateField}
                selectedMonth={Number(promoMonth)}
                selectedDay={Number(promoDay)}
                selectedYear={Number(promoYear)}
                onDateChange={(e) => {
                  handleDateChange(e);
                }}
              />
            </Grid2>

            <Grid2 size={12} sx={{ marginBottom: "22px" }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {JobDetailsCardLabels.personalCodeField}
              </Typography>
              <TextField
                fullWidth
                value={jobDetails.personalCode}
                variant="outlined"
                disabled
              />
            </Grid2>

            <Grid2 size={12} sx={{ marginBottom: "22px" }}>
              <DateSelectField
                label={JobDetailsCardLabels.sinceInCompany}
                selectedMonth={Number(companyMonth)}
                selectedDay={Number(companyDay)}
                selectedYear={Number(companyYear)}
                onDateChange={(e) => {
                  handleDateChange(e);
                }}
              />
            </Grid2>
            <Grid2
              size={12}
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
            >
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {JobDetailsCardLabels.eo}
              </Typography>
              <RadioGroup
                row
                value={jobDetails.eo}
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, eo: e.target.value })
                }
                style={{ marginBottom: "22px" }} // Espaciado entre el título y los radios
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio sx={{ borderRadius: "1px" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio sx={{ borderRadius: "1px" }} />}
                  label="No"
                />
              </RadioGroup>
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
