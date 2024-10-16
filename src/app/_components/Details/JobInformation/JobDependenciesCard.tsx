/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

interface JobDependenciesCardProps {
  jobDependencies: {
    recruiter: string;
    recruiterCode: string;
    leader: string;
    leaderCode: string;
  };
  setJobDependencies: (details: any) => void;
}

const JobDependenciesCard = ({
  jobDependencies,
  setJobDependencies,
}: JobDependenciesCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Dependencies
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Recruiter"
              value={jobDependencies.recruiter}
              onChange={(e) =>
                setJobDependencies({
                  ...jobDependencies,
                  recruiter: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Recruiter Code"
              value={jobDependencies.recruiterCode}
              variant="outlined"
              disabled
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Leader"
              value={jobDependencies.leader}
              onChange={(e) =>
                setJobDependencies({
                  ...jobDependencies,
                  leader: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label="Leader Code"
              value={jobDependencies.leaderCode}
              variant="outlined"
              disabled
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default JobDependenciesCard;
