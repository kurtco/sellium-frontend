/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import DateSelectField from "../../DateSelectedField";
import { JobDetailsCardLabels } from "@/constants/labels.enums";
import { insuranceCompanies, positionsSelect } from "@/constants/constant";
import { formatDateToString, splitDateString } from "@/utils/commonFunctions";
import { JobInformation } from "@/interfaces/interfaces";

interface JobDetailsCardProps {
  jobDetails: JobInformation;
  setJobDetails: (details: any) => void;
}

const JobDetailsCard = ({ jobDetails, setJobDetails }: JobDetailsCardProps) => {
  const theme = useTheme();
  const {
    month: promoMonth,
    day: promoDay,
    year: promoYear,
  } = splitDateString(formatDateToString(jobDetails.promotionDate));

  const {
    month: companyMonth,
    day: companyDay,
    year: companyYear,
  } = splitDateString(formatDateToString(jobDetails.partOfCompanySince));

  const handlePromitionDateChange = (newDate: string) => {
    setJobDetails({
      ...jobDetails,
      promotionDate: newDate,
    });
  };

  const handleSinceInCompanyDateChange = (newDate: string) => {
    setJobDetails({
      ...jobDetails,
      partOfCompanySince: newDate,
    });
  };

  return (
    <Box>
      <Card variant="outlined">
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
            {JobDetailsCardLabels.title}
          </Typography>
        </Box>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={12} sx={{ marginBottom: "22px" }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {JobDetailsCardLabels.positionField}
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={jobDetails?.position}
                  onChange={(e) =>
                    setJobDetails({
                      ...jobDetails,
                      position: e.target.value,
                    })
                  }
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {positionsSelect.map((position) => (
                    <MenuItem key={position} value={position}>
                      {position}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={12} sx={{ marginBottom: "22px" }}>
              <DateSelectField
                label={JobDetailsCardLabels.promotionDateField}
                selectedMonth={Number(promoMonth)}
                selectedDay={Number(promoDay)}
                selectedYear={Number(promoYear)}
                onDateChange={(e) => {
                  handlePromitionDateChange(e);
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
                onChange={(e) =>
                  setJobDetails({
                    ...jobDetails,
                    personalCode: e.target.value,
                  })
                }
              />
            </Grid2>

            <Grid2 size={12} sx={{ marginBottom: "22px" }}>
              <DateSelectField
                label={JobDetailsCardLabels.sinceInCompany}
                selectedMonth={Number(companyMonth)}
                selectedDay={Number(companyDay)}
                selectedYear={Number(companyYear)}
                onDateChange={(e) => {
                  handleSinceInCompanyDateChange(e);
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
                onChange={(e) => {
                  const selection: boolean = e.target.value === "true";
                  setJobDetails({ ...jobDetails, eo: selection });
                }}
                style={{ marginBottom: "22px" }} // Espaciado entre el título y los radios
              >
                <FormControlLabel
                  value="true" // Cambiado a "true"
                  control={<Radio sx={{ borderRadius: "1px" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false" // Cambiado a "false"
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
                  sx={{
                    color: theme.palette.text.primary,
                  }}
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
