"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import JobDetailsCard from "./JobDetailsCard";
import JobDependenciesCard from "./JobDependenciesCard";
import { Box, Button } from "@mui/material";
import { JobInformationWrapperLabels } from "@/constants/labels.enums";
import { DetailsState } from "@/interfaces/interfaces";
import { detailsDummyData } from "@/constants/constant";

const JobInformationWrapper = () => {
  const [jobDetails, setJobDetails] = useState<DetailsState>(detailsDummyData);

  const [jobDependencies, setJobDependencies] = useState({
    recruiter: "Francisco Velázquez Rojas",
    recruiterCode: "A0563",
    leader: "Marcel & Isa Macias",
    leaderCode: "GFI09",
  });

  const handleSubmit = async () => {
    try {
      // Hacer la solicitud al API route de Next.js
      const response = await fetch("/api/save-personal-information", {
        method: "POST",
        body: JSON.stringify(jobDetails.personalInformation),
      });

      if (!response.ok) {
        throw new Error(
          `Error al guardar la información: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      console.log("Datos guardados con éxito:", responseData);

      // Aquí podrías mostrar una notificación de éxito o hacer algo más con la respuesta.
    } catch (error) {
      console.error("Error al guardar la información:", error);
      // Aquí podrías mostrar una notificación de error.
    }
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
            jobDetails={jobDetails.jobInformation}
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
