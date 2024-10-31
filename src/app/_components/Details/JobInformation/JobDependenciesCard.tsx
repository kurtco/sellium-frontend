/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Card, CardContent, TextField, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { JobDependenciesCardLabels } from "@/constants/labels.enums";
import { Users } from "@/interfaces/interfaces";

interface JobDependenciesCardProps {
  jobDependencies: Users | null;
  setJobDependencies: (details: any) => void;
}

const JobDependenciesCard = ({
  jobDependencies,
  setJobDependencies,
}: JobDependenciesCardProps) => {
  return (
    <Card variant="outlined">
      <Box
        sx={{
          marginBottom: 2,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 1,
          padding: "16px 0px 16px 20px ",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {JobDependenciesCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {JobDependenciesCardLabels.recruiterField}
            </Typography>
            <TextField
              fullWidth
              value={jobDependencies?.recruiterName}
              onChange={(e) =>
                setJobDependencies({
                  ...jobDependencies,
                  recruiter: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid2>

          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {JobDependenciesCardLabels.recruiterCodeField}
            </Typography>
            <TextField
              fullWidth
              value={jobDependencies?.recruiterCode}
              variant="outlined"
              onChange={(e) =>
                setJobDependencies({
                  ...jobDependencies,
                  recruiterCode: e.target.value,
                })
              }
            />
          </Grid2>

          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {JobDependenciesCardLabels.leaderField}
            </Typography>
            <TextField
              fullWidth
              value={jobDependencies?.leaderName}
              onChange={(e) =>
                setJobDependencies({
                  ...jobDependencies,
                  leader: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid2>

          <Grid2 size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {JobDependenciesCardLabels.leaderCodeField}
            </Typography>
            <TextField
              fullWidth
              value={jobDependencies?.leaderCode}
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
