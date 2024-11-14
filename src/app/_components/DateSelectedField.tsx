import React, { useMemo, useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { monthsList } from "@/constants/constant";
import { getDaysInMonth } from "@/utils/commonFunctions";

interface DateSelectFieldProps {
  label: string;
  selectedMonth?: number | null;
  selectedDay?: number | null;
  selectedYear: number;
  onDateChange: (value: string) => void;
}

const DateSelectField = ({
  label,
  selectedMonth,
  selectedDay,
  selectedYear,
  onDateChange,
}: DateSelectFieldProps) => {
  const theme = useTheme();
  const [localMonth, setLocalMonth] = useState<number | null>(
    selectedMonth ?? null
  );
  const [localDay, setLocalDay] = useState<number | null>(selectedDay ?? null);
  const [localYear, setLocalYear] = useState<number>(
    selectedYear || new Date().getFullYear()
  );

  useEffect(() => {
    if (
      selectedMonth !== null &&
      !Number.isNaN(selectedMonth) &&
      selectedMonth !== undefined
    )
      setLocalMonth(selectedMonth);
    if (
      selectedDay !== null &&
      !Number.isNaN(selectedDay) &&
      selectedDay !== undefined
    )
      setLocalDay(selectedDay);
    if (
      selectedYear !== null &&
      !Number.isNaN(selectedYear) &&
      selectedYear !== undefined
    )
      setLocalYear(selectedYear);
  }, [selectedMonth, selectedDay, selectedYear]);

  useEffect(() => {
    if (localMonth && localDay && localYear) {
      const newDate = `${localMonth}/${localDay}/${localYear}`;
      onDateChange(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localMonth, localDay, localYear]);

  const daysInMonth = useMemo(() => {
    if (!localMonth) {
      return [];
    }
    return getDaysInMonth(localMonth, localYear);
  }, [localMonth, localYear]);

  const displayedMonth = localMonth ? monthsList[localMonth - 1] : "";

  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    const monthName = event.target.value;
    const monthIndex = monthsList.indexOf(monthName) + 1;
    setLocalMonth(monthIndex);
  };

  const handleDayChange = (event: SelectChangeEvent<string>) => {
    const day = Number(event.target.value);
    setLocalDay(day);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = Number(event.target.value);
    setLocalYear(year);
  };

  return (
    <>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {label}
      </Typography>
      <Grid2 container spacing={2} alignItems="center">
        {/* Month Select */}
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth>
            <Select
              value={displayedMonth || ""}
              onChange={handleMonthChange}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
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
              value={localDay ? localDay.toString() : ""}
              onChange={handleDayChange}
              fullWidth
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              {daysInMonth?.map((day) => (
                <MenuItem key={day} value={day.toString()}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        {/* Year Input */}
        <Grid2 size={{ xs: 6, sm: 4 }}>
          <TextField
            fullWidth
            value={localYear || ""}
            onChange={handleYearChange}
            variant="outlined"
            type="number"
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default DateSelectField;
