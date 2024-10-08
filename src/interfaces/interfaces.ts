export interface DataFromImage {
  recruiterName: string;
  leaderName: string;
  leaderCode: string;
  startDate?: Date;
  birthDate?: Date;
  phone: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
  spouseName: string;
  userName: string;
  position: string;
  recruiterCode: string;
  userCode: string;
}

export interface RecruiterTableData {
  name: string;
  position: string;
  phoneNumber: string;
  email: string;
  profileProgress: number;
}

export interface CsvHeader {
  label: string;
  key: string;
}

export interface Users {
  id: number;
  recruiterName: string;
  leaderName: string;
  leaderCode: string;
  userName: string;
  position: string;
  recruiterCode: string;
  userCode: string;
  startDate: string;
  birthDate: string;
  phone: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
  spouseName: string;
  recruiter: Recruiter;
  recruits: Recruit[];
}

export interface Recruiter {
  id: number;
  recruiterName: string;
  leaderName: string;
  leaderCode: string;
  userName: string;
  position: string;
  recruiterCode: string;
  userCode: string;
  startDate: string;
  birthDate: string;
  phone: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
  spouseName: string;
}

export interface Recruit {
  id: number;
  recruiterName: string;
  leaderName: string;
  leaderCode: string;
  userName: string;
  position: string;
  recruiterCode: string;
  userCode: string;
  startDate: string;
  birthDate: string;
  phone: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
  spouseName: string;
}

export interface Colors {
  blue: string[];
  red: string[];
  gold: string[];
  cyan: string[];
  green: string[];
  grey: string[];
  [key: string]: string[];
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface ErrorResponse {
  error?: string;
  message?: string;
  userCode?: string;
}
