import { Recruit } from "@/interfaces/interfaces";

export const calculateCompletion = (obj: Recruit): number => {
  const totalFields = Object.keys(obj).length;
  const filledFields = Object.values(obj).filter(
    (value) => value !== null && value !== "" && value !== undefined
  ).length;

  const completionPercentage = (filledFields / totalFields) * 100;
  return Math.round(completionPercentage);
};
