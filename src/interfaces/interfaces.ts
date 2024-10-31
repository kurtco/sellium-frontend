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

export interface ErrorResponse<T = unknown> {
  statusCode?: number;
  error: string;
  message: string;
  userCode?: string;
  data?: T;
}
export interface FamilyDetails {
  spouseName: string;
}

export interface ContactDetails {
  phoneNumber: string;
  phoneCode: string;
  email: string;
  homeAddress: string;
  businessAddress: string;
}

export interface PersonalInformation {
  userCode: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  insured?: boolean;
  productType?: string;
  phoneCode?: string;
  phoneNumber?: string;
  email?: string;
  homeAddress?: string;
  businessAddress?: string;
  spouseName?: string;
  position?: string;
  promotionDate?: string;
  personalCode?: string;
  companyDate?: string;
  appointed?: string;
  eo?: boolean;
}

export interface JobInformation {
  userCode: string;
  position?: string;
  promotionDate?: string;
  personalCode?: string;
  partOfCompanySince?: string;
  eo?: boolean;
  appointed?: string;
  recruiter?: string;
  recuiterCode?: string;
  leader?: string;
}

export interface LicenseAndTrainings {
  userCode: string;
  licenseType: string;
  expires: string;
  fastStar?: boolean;
  state: string;
  presented: string;
  approved?: boolean;
  orientation1?: boolean;
  orientation2?: boolean;
  orientation3?: boolean;
  orientation4?: boolean;
  bootCamp?: boolean;
}

export interface Progress {
  test?: string; // ajustar cuando se tenga la estructura de datoa
}

export interface DetailsState {
  personalInformation: PersonalInformation;
  jobInformation: JobInformation;
  licenseAndTrainings: LicenseAndTrainings;
  progress: Progress;
  user: Users | null;
}
