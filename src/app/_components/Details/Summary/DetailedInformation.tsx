"use client";
import React from "react";
import { Box } from "@mui/material";
import PersonalInformationCard from "./PersonalInformationCard";
import JobInformationCard from "./JobInformationCard";
import LicensedAndTrainingCard from "./LicensedAndTrainingCard";
import {
  JobInformation,
  LicenseAndTrainings,
  PersonalInformation,
} from "@/interfaces/interfaces";

interface DetailedInformationProps {
  personalDetails: PersonalInformation;
  jobDetails: JobInformation;
  licenseDetails: LicenseAndTrainings;
}

const DetailedInformation = ({
  personalDetails,
  jobDetails,
  licenseDetails,
}: DetailedInformationProps) => {
  return (
    <Box sx={{ margin: 0, padding: "0 16px 16px 16px" }}>
      {/* Personal Information Section */}
      <PersonalInformationCard personalDetails={personalDetails} />
      {/* Job Information Section */}
      <JobInformationCard jobDetails={jobDetails} />
      {/* License & Trainings Section */}
      <LicensedAndTrainingCard licenseDetails={licenseDetails} />
    </Box>
  );
};

export default DetailedInformation;
