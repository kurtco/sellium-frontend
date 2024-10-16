"use client";
import React from "react";
import Grid from "@mui/material/Grid2";
import JobDetailsCard from "./JobDetailsCard";
import JobDependenciesCard from "./JobDependenciesCard";
import { Box, Button } from "@mui/material";
import { JobInformationWrapperLabels } from "@/constants/labels.enums";

const JobInformationWrapper = () => {
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
          backgroundColor: "red",
        }}
      >
        <Grid>
          <JobDetailsCard />
        </Grid>
        <Grid>
          <JobDependenciesCard />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary">
          {JobInformationWrapperLabels.button}
        </Button>
      </Box>
    </>
  );
};

export default JobInformationWrapper;
