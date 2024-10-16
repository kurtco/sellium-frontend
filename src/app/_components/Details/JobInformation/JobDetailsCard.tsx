"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

import { getCurrentMonth, getDaysInMonth } from "@/utils/commonFunctions";
import DateSelectField from "../../DateSelectedField";

interface DateInfo {
  month: string;
  day: number;
  year: number;
}

const JobDetailsCard = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  const [dates, setDates] = useState<{
    promotionDate: DateInfo;
    companyDate: DateInfo;
  }>({
    promotionDate: {
      month: getCurrentMonth(),
      day: currentDay,
      year: currentYear,
    },
    companyDate: {
      month: getCurrentMonth(),
      day: currentDay,
      year: currentYear,
    },
  });

  const handleDateChange = (
    fieldType: keyof typeof dates,
    updatedDate: Partial<DateInfo>
  ) => {
    setDates((prevDates) => ({
      ...prevDates,
      [fieldType]: { ...prevDates[fieldType], ...updatedDate },
    }));
  };

  useEffect(() => {
    const days = getDaysInMonth(
      dates.promotionDate.month,
      dates.promotionDate.year
    );

    if (dates.promotionDate.day > days.length) {
      setDates((prevDates) => ({
        ...prevDates,
        promotionDate: {
          ...prevDates.promotionDate,
          day: days.length,
        },
      }));
    }
  }, [
    dates.promotionDate.month,
    dates.promotionDate.year,
    dates.promotionDate.day,
  ]);

  useEffect(() => {
    const days = getDaysInMonth(
      dates.companyDate.month,
      dates.companyDate.year
    );

    if (dates.companyDate.day > days.length) {
      setDates((prevDates) => ({
        ...prevDates,
        companyDate: {
          ...prevDates.companyDate,
          day: days.length,
        },
      }));
    }
  }, [dates.companyDate.month, dates.companyDate.year, dates.companyDate.day]);

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
                value="Representative Licensed"
                variant="outlined"
              />
            </Grid2>

            {/* Promotion Date usando DateSelectField */}
            <Grid2 size={12}>
              <DateSelectField
                label="Promotion Date"
                selectedMonth={dates.promotionDate.month}
                selectedDay={dates.promotionDate.day}
                selectedYear={dates.promotionDate.year}
                onMonthChange={(e) =>
                  handleDateChange("promotionDate", {
                    month: String(e.target.value),
                  })
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
                defaultValue="GFI09"
                variant="outlined"
                disabled
              />
            </Grid2>

            {/* Part of Company Since usando DateSelectField */}
            <Grid2 size={12}>
              <DateSelectField
                label="Part of Company Since"
                selectedMonth={dates.companyDate.month}
                selectedDay={dates.companyDate.day}
                selectedYear={dates.companyDate.year}
                onMonthChange={(e) =>
                  handleDateChange("companyDate", {
                    month: String(e.target.value),
                  })
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
                defaultValue="American Equity Investment Life Ins Co, ANICO, American National Life Ins Co of New York, +5"
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
