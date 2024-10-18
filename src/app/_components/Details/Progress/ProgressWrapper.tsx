"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Card } from "@mui/material";

import { LicenseAndTrainingsWrapperLabels } from "@/constants/labels.enums";
import MonthlyPointsCard, { MonthlyPoints } from "./MonthlyPointsCard";
import AgentsRecruitedSalesCard from "./AgentsRecruitedSalesCard";
import AchievementsCard from "./AchievementsCard";

const ProgressWrapper = () => {
  const [monthlyPoints, setMonthlyPoints] = useState<MonthlyPoints[]>([
    { month: "January", points: 12120, percentage: 12 },
    { month: "February", points: 21000, percentage: 21 },
  ]);

  const [year, setYear] = useState<number>(2024);

  const [agentsDetails, setAgentsDetails] = useState({
    numberOfAgents: 2,
    numberOfPoliciesSold: 3,
    isCoach: true,
    netLicense: true,
  });

  const [achievements, setAchievements] = useState({
    isCoach: true,
    netLicense: true,
  });

  const handleSubmit = () => {
    console.log("Monthly Points:", monthlyPoints);
    console.log("Agents Details:", agentsDetails);
    console.log("Achievements:", achievements);
  };

  return (
    <Card variant="outlined">
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
          <MonthlyPointsCard
            monthlyPoints={monthlyPoints}
            setMonthlyPoints={setMonthlyPoints}
            year={year}
            setYear={setYear}
          />
        </Grid>

        <Grid>
          <AgentsRecruitedSalesCard
            agentsDetails={agentsDetails}
            setAgentsDetails={setAgentsDetails}
          />
          <AchievementsCard
            achievements={achievements}
            setAchievements={setAchievements}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ marginTop: 2, marginBottom: "20px" }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {LicenseAndTrainingsWrapperLabels.button}
        </Button>
      </Box>
    </Card>
  );
};

export default ProgressWrapper;
