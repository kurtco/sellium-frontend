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
import { JobInformation, Users } from "@/interfaces/interfaces";

interface JobDetailsCardProps {
  personalInfoData: JobInformation;
  userData: Users;
  setPersonalInfoData: (details: Partial<JobInformation>) => void;
  setUserData: (details: Pick<Users, "position">) => void;
}

const JobDetailsCard = ({
  userData,
  personalInfoData,
  setPersonalInfoData,
  setUserData,
}: JobDetailsCardProps) => {
  const theme = useTheme();
  const {
    month: promoMonth,
    day: promoDay,
    year: promoYear,
  } = splitDateString(formatDateToString(personalInfoData.promotionDate));

  const {
    month: companyMonth,
    day: companyDay,
    year: companyYear,
  } = splitDateString(formatDateToString(personalInfoData.partOfCompanySince));

  const handlePromitionDateChange = (newDate: string) => {
    setPersonalInfoData({
      ...personalInfoData,
      promotionDate: newDate,
    });
  };

  const handleSinceInCompanyDateChange = (newDate: string) => {
    setPersonalInfoData({
      ...personalInfoData,
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
                  value={userData?.position}
                  onChange={(e) =>
                    setUserData({
                      ...personalInfoData,
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
                value={personalInfoData.personalCode}
                variant="outlined"
                onChange={(e) =>
                  setPersonalInfoData({
                    ...personalInfoData,
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
                value={personalInfoData.eo ? "true" : "false"}
                onChange={(e) => {
                  setPersonalInfoData({
                    ...personalInfoData,
                    eo: e.target.value === "true",
                  });
                }}
                style={{ marginBottom: "22px" }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio sx={{ borderRadius: "1px" }} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio sx={{ borderRadius: "1px" }} />}
                  label="No"
                />
              </RadioGroup>
            </Grid2>

            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel>{JobDetailsCardLabels.appointedField}</InputLabel>
                <Select
                  value={personalInfoData.appointed}
                  onChange={(e) =>
                    setPersonalInfoData({
                      ...personalInfoData,
                      appointed: e.target.value,
                    })
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
