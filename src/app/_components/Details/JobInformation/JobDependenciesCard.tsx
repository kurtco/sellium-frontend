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
import { JobDependenciesCardLabels } from "@/constants/labels.enums";

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
          {JobDependenciesCardLabels.title}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <TextField
              fullWidth
              label={JobDependenciesCardLabels.recruiterField}
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
              label={JobDependenciesCardLabels.recruiterCodeField}
              value={jobDependencies.recruiterCode}
              variant="outlined"
              disabled
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              fullWidth
              label={JobDependenciesCardLabels.leaderField}
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
              label={JobDependenciesCardLabels.leaderCodeField}
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
