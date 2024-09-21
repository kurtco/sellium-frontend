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
