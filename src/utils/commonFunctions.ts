import { monthsList } from "@/constants/constant";
import { ValidationText } from "@/constants/labels.enums";
import { MonthlyPoints, Progress, Recruit } from "@/interfaces/interfaces";

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

export const getDaysInMonth = (month: number, year: number): number[] => {
  // Restamos 1 al mes porque los meses en el objeto Date van de 0 a 11
  const date = new Date(year, month, 0); // Aquí "month" es 1-12, así que no es necesario buscar en monthsList
  const daysArray = Array.from({ length: date.getDate() }, (_, i) => i + 1);
  return daysArray;
};

// Función para convertir Date a string en formato "MM/DD/YYYY"
export const formatDateToString = (
  date: Date | string | null | undefined
): string | undefined => {
  if (!date) return undefined;
  if (date instanceof Date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`; // Ajustado a formato MM/DD/YYYY
  }
  return date;
};

// Función para hacer el split del string de fecha y convertirlo en un objeto
export const splitDateString = (dateString: string | undefined) => {
  if (!dateString) return { month: "", day: "", year: "" };
  const [month, day, year] = dateString.split("/"); // Cambiado el separador a "/"
  return { month, day: Number(day), year: Number(year) };
};

export const getMonthName = (date: Date | null | undefined): string => {
  if (!date || isNaN(date.getTime())) {
    return "";
  }
  const monthIndex = date.getMonth(); // Obtiene el índice del mes (0-11)
  return monthsList[monthIndex]; // Devuelve el nombre del mes
};

export const validateEmail = (email: string) => {
  if (email === "") return "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : ValidationText.email;
};

export const isFilled = <T>(value: T): boolean => {
  return (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    !(typeof value === "number" && isNaN(value))
  );
};

export const calculateProfileCompletion = <T extends object>(
  data: T | null
): number => {
  if (!data) {
    return 0;
  }
  const totalFields = Object.keys(data).length;
  const filledFields = Object.values(data).filter((value) =>
    isFilled(value)
  ).length;
  return Math.round((filledFields / totalFields) * 100);
};

export const createMonthlyPointsArray = (
  progress: Progress
): MonthlyPoints[] => {
  const arr = [
    {
      month: "January",
      points: progress.januaryPoints || 0,
      percentage: progress.januaryPercentage || 0,
    },
    {
      month: "February",
      points: progress.februaryPoints || 0,
      percentage: progress.februaryPercentage || 0,
    },
    {
      month: "March",
      points: progress.marchPoints || 0,
      percentage: progress.marchPercentage || 0,
    },
    {
      month: "April",
      points: progress.aprilPoints || 0,
      percentage: progress.aprilPercentage || 0,
    },
    {
      month: "May",
      points: progress.mayPoints || 0,
      percentage: progress.mayPercentage || 0,
    },
    {
      month: "June",
      points: progress.junePoints || 0,
      percentage: progress.junePercentage || 0,
    },
    {
      month: "July",
      points: progress.julyPoints || 0,
      percentage: progress.julyPercentage || 0,
    },
    {
      month: "August",
      points: progress.augustPoints || 12,
      percentage: progress.augustPercentage || 0,
    },
    {
      month: "September",
      points: progress.septemberPoints || 0,
      percentage: progress.septemberPercentage || 0,
    },
    {
      month: "October",
      points: progress.octoberPoints || 0,
      percentage: progress.octoberPercentage || 0,
    },
    {
      month: "November",
      points: progress.novemberPoints || 0,
      percentage: progress.novemberPercentage || 0,
    },
    {
      month: "December",
      points: progress.decemberPoints || 0,
      percentage: progress.decemberPercentage || 0,
    },
  ];
  return arr;
};
