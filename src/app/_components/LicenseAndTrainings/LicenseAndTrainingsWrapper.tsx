"use client";
import React, { useState } from "react";
import Grid2 from "@mui/material/Grid2";
import { Box, Button } from "@mui/material";
import LicenseDetailsCard, { LicenseDetails } from "./LicenseDetailsCard";
import TrainingsCard from "./TrainingsCard";
import LicenseExamCard from "./LicenseExamCard";

const LicenseAndTrainingsWrapper = () => {
  const [licenseDetails, setLicenseDetails] = useState<LicenseDetails>({
    licenseType: "License 214",
    expires: {
      month: "",
      day: 0,
      year: 0,
    },
    fastStar: false,
    state: "",
    presented: {
      month: "",
      day: 0,
      year: 0,
    },
    approved: false,
  });

  // Ajusta el estado de trainings para coincidir con el tipo esperado
  const [trainings, setTrainings] = useState({
    orientation1: "Yes",
    orientation2: "Yes",
    orientation3: "Yes",
    orientation4: "Yes",
    bootCamp: "Yes",
  });

  const [licenseExam, setLicenseExam] = useState({
    state: "Florida",
    presented: { month: "November", day: 14, year: 2023 },
    approved: false,
  });

  const handleSubmit = () => {
    console.log("License Details:", licenseDetails);
    console.log("Trainings:", trainings);
  };

  return (
    <>
      <Grid2
        container
        spacing={2}
        sx={{
          padding: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          gap: "22px",
        }}
      >
        <Grid2>
          <LicenseDetailsCard
            licenseDetails={licenseDetails}
            setLicenseDetails={setLicenseDetails}
          />
          <LicenseExamCard
            licenseExam={licenseExam}
            setLicenseExam={setLicenseExam}
          />
        </Grid2>
        <Grid2>
          <TrainingsCard trainings={trainings} setTrainings={setTrainings} />
        </Grid2>
      </Grid2>
      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default LicenseAndTrainingsWrapper;