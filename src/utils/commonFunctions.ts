import { monthsList } from "@/constants/constant";
import { Recruit } from "@/interfaces/interfaces";

export const calculateCompletion = (obj: Recruit): number => {
  const totalFields = Object.keys(obj).length;
  const filledFields = Object.values(obj).filter(
    (value) => value !== null && value !== "" && value !== undefined
  ).length;

  const completionPercentage = (filledFields / totalFields) * 100;
  return Math.round(completionPercentage);
};

export const getCurrentMonth = (): string => {
  const now = new Date();
  return monthsList[now.getMonth()];
};

export const getDaysInMonth = (month: string, year: number): number[] => {
  const monthIndex = monthsList.indexOf(month);
  const date = new Date(year, monthIndex + 1, 0);
  const daysArray = Array.from({ length: date.getDate() }, (_, i) => i + 1);
  return daysArray;
};
