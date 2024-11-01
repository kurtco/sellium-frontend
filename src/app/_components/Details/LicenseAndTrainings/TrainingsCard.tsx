"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { TrainingsCardLabels } from "@/constants/labels.enums";
import { LicenseAndTrainings } from "@/interfaces/interfaces";

interface TrainingsCardProps {
  trainings: LicenseAndTrainings;
  setTrainings: (details: Partial<LicenseAndTrainings>) => void;
}

const TrainingsCard = ({ trainings, setTrainings }: TrainingsCardProps) => {
  return (
    <Card variant="outlined">
      <Box
        sx={{
          marginBottom: "22px",
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 1,
          padding: "16px 0px 16px 20px ",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {TrainingsCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation1}
            </Typography>

            <RadioGroup
              row
              value={trainings.orientation1 ? "true" : "false"}
              onChange={(e) =>
                setTrainings({
                  ...trainings,
                  orientation1: e.target.value === "true",
                })
              }
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation2}
            </Typography>

            <RadioGroup
              row
              value={trainings.orientation2 ? "true" : "false"}
              onChange={(e) =>
                setTrainings({
                  ...trainings,
                  orientation2: e.target.value === "true",
                })
              }
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation3}
            </Typography>

            <RadioGroup
              row
              value={trainings.orientation3 ? "true" : "false"}
              onChange={(e) =>
                setTrainings({
                  ...trainings,
                  orientation3: e.target.value === "true",
                })
              }
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation4 ? "true" : "false"}
            </Typography>
            <RadioGroup
              row
              value={trainings.orientation4}
              onChange={(e) =>
                setTrainings({
                  ...trainings,
                  orientation4: e.target.value === "true",
                })
              }
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.bootCampOrientation}
            </Typography>
            <RadioGroup
              row
              value={trainings.bootCamp ? "true" : "false"}
              onChange={(e) =>
                setTrainings({
                  ...trainings,
                  bootCamp: e.target.value === "true",
                })
              }
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default TrainingsCard;
