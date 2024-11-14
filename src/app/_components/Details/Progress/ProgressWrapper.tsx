"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button } from "@mui/material";

import { LicenseAndTrainingsWrapperLabels } from "@/constants/labels.enums";
import MonthlyPointsCard from "./MonthlyPointsCard";
import AgentsRecruitedSalesCard from "./AgentsRecruitedSalesCard";
import AchievementsCard from "./AchievementsCard";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { MonthlyPoints, Progress } from "@/interfaces/interfaces";

import { saveProgress } from "../../../../../store/details/progressSlice";
import { createMonthlyPointsArray } from "@/utils/commonFunctions";
import { useParams } from "next/navigation";

const ProgressWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const userCode = params.id as string;

  const { progress: initialData } = useSelector(
    (state: RootState) => state.progress
  );

  const [progressData, setProgressData] = useState<Progress>(initialData);
  const [progressYearSelected, setprogressYearSelected] = useState<number>(
    initialData.year || new Date().getFullYear()
  );

  const handleMonthlyPointsChange = (updatedMonthlyPoints: MonthlyPoints[]) => {
    setProgressData((prevState) => {
      const newState: Progress = { ...prevState };
      updatedMonthlyPoints.forEach((point) => {
        const month = point.month.toLowerCase();

        newState[`${month}Points` as keyof Progress] = point.points;
        newState[`${month}Percentage` as keyof Progress] = point.percentage;
      });
      return newState;
    });
  };

  const handleSubmit = () => {
    const updatedProgress = {
      ...progressData,
      userCode: userCode,
    };

    dispatch(saveProgress(updatedProgress));
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
          <MonthlyPointsCard
            monthlyPoints={createMonthlyPointsArray(progressData)}
            setMonthlyPoints={handleMonthlyPointsChange}
            setYear={setprogressYearSelected}
            year={progressYearSelected}
          />
        </Grid>

        <Grid>
          <AgentsRecruitedSalesCard
            agentsDetails={progressData}
            setAgentsDetails={(data) => {
              setProgressData((prevState) => ({
                ...prevState,
                ...data,
              }));
            }}
          />
          <AchievementsCard
            achievements={progressData}
            setAchievements={(data) => {
              setProgressData((prevState) => ({
                ...prevState,
                ...data,
              }));
            }}
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
    </>
  );
};

export default ProgressWrapper;
