"use client";
import React from "react";
import { Box } from "@mui/material";
import PersonalInformationCard from "./PersonalInformationCard";
import JobInformationCard from "./JobInformationCard";
import LicensedAndTrainingCard from "./LicensedAndTrainingCard";

const DetailedInformation = () => {
  return (
    <Box sx={{ margin: 0, padding: "0 16px 16px 16px" }}>
      {/* Personal Information Section */}
      <PersonalInformationCard />
      {/* Job Information Section */}
      <JobInformationCard />
      {/* License & Trainings Section */}
      <LicensedAndTrainingCard />
    </Box>
  );
};

export default DetailedInformation;
