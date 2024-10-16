"use client";
import React from "react";
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { monthsList } from "@/constants/constant";
import { getDaysInMonth } from "@/utils/commonFunctions";

interface DateSelectFieldProps {
  label: string;
  selectedMonth: string;
  selectedDay: number;
  selectedYear: number;
  onMonthChange: (event: SelectChangeEvent<string>) => void;
  onDayChange: (event: SelectChangeEvent<string>) => void;
  onYearChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateSelectField = ({
  label,
  selectedMonth,
  selectedDay,
  selectedYear,
  onMonthChange,
  onDayChange,
  onYearChange,
}: DateSelectFieldProps) => {
  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

  return (
    <>
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth>
            <Select value={selectedMonth} onChange={onMonthChange}>
              {monthsList.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        {/* Day Select */}
        <Grid2 size={{ xs: 6, sm: 4 }}>
          <FormControl fullWidth>
            <Select
              value={selectedDay.toString()}
              onChange={(e) => onDayChange(e)}
              fullWidth
            >
              {daysInMonth?.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 6, sm: 4 }}>
          <TextField
            fullWidth
            value={selectedYear}
            onChange={onYearChange}
            variant="outlined"
            type="number"
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default DateSelectField;
