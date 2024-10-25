import { monthsList } from "@/constants/constant";
import { ValidationText } from "@/constants/labels.enums";
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

export const getDaysInMonth = (month: number, year: number): number[] => {
  // Restamos 1 al mes porque los meses en el objeto Date van de 0 a 11
  const date = new Date(year, month, 0); // Aquí "month" es 1-12, así que no es necesario buscar en monthsList
  const daysArray = Array.from({ length: date.getDate() }, (_, i) => i + 1);
  return daysArray;
};

// Función para convertir Date a string en formato "MM-DD-YYYY"
export const formatDateToString = (
  date: Date | string | null | undefined
): string | undefined => {
  if (!date) return undefined;
  if (date instanceof Date) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
  return date;
};

// Función para hacer el split del string de fecha y convertirlo en un objeto
export const splitDateString = (dateString: string | undefined) => {
  if (!dateString) return { month: "", day: "", year: "" };
  const [month, day, year] = dateString.split("-");
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
