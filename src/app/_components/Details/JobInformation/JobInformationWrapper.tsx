"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import JobDetailsCard from "./JobDetailsCard";
import JobDependenciesCard from "./JobDependenciesCard";
import { Box, Button } from "@mui/material";
import { JobInformationWrapperLabels } from "@/constants/labels.enums";

const JobInformationWrapper = () => {
  // Estado para los datos que se obtienen de JobDetailsCard y JobDependenciesCard
  const [jobDetails, setJobDetails] = useState({
    position: "Representative Licensed",
    promotionDate: {
      month: "",
      day: 0,
      year: 0,
    },
    personalCode: "GFI09",
    companyDate: {
      month: "",
      day: 0,
      year: 0,
    },
    appointed: "",
    eo: true,
  });

  const [jobDependencies, setJobDependencies] = useState({
    recruiter: "Francisco Velázquez Rojas",
    recruiterCode: "A0563",
    leader: "Marcel & Isa Macias",
    leaderCode: "GFI09",
  });

  // Manejar el clic en el botón
  const handleSubmit = () => {
    console.log("Job Details:", jobDetails);
    console.log("Job Dependencies:", jobDependencies);
    // Aquí puedes procesar los datos, enviarlos a una API, etc.
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
          gap: "22px",
        }}
      >
        <Grid>
          <JobDetailsCard
            jobDetails={jobDetails}
            setJobDetails={setJobDetails}
          />
        </Grid>
        <Grid>
          <JobDependenciesCard
            jobDependencies={jobDependencies}
            setJobDependencies={setJobDependencies}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ marginTop: 2, marginBottom: "20px" }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {JobInformationWrapperLabels.button}
        </Button>
      </Box>
    </>
  );
};

export default JobInformationWrapper;
