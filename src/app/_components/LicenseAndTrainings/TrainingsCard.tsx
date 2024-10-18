"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { TrainingsCardLabels } from "@/constants/labels.enums";

interface Training {
  orientation1: string;
  orientation2: string;
  orientation3: string;
  orientation4: string;
  bootCamp: string;
}

interface TrainingsCardProps {
  trainings: Training;
  setTrainings: (trainings: Training) => void;
}

const TrainingsCard = ({ trainings, setTrainings }: TrainingsCardProps) => {
  const handleRadioChange = (field: keyof Training, value: string) => {
    setTrainings({ ...trainings, [field]: value });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {TrainingsCardLabels.title}
        </Typography>
        <Divider sx={{ marginBottom: "22px" }} />

        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation1}
            </Typography>
            <RadioGroup
              row
              value={trainings.orientation1}
              onChange={(e) =>
                handleRadioChange("orientation1", e.target.value)
              }
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation2}
            </Typography>
            <RadioGroup
              row
              value={trainings.orientation2}
              onChange={(e) =>
                handleRadioChange("orientation2", e.target.value)
              }
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation3}
            </Typography>
            <RadioGroup
              row
              value={trainings.orientation3}
              onChange={(e) =>
                handleRadioChange("orientation3", e.target.value)
              }
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.orientation4}
            </Typography>
            <RadioGroup
              row
              value={trainings.orientation4}
              onChange={(e) =>
                handleRadioChange("orientation4", e.target.value)
              }
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {TrainingsCardLabels.bootCampOrientation}
            </Typography>
            <RadioGroup
              row
              value={trainings.bootCamp}
              onChange={(e) => handleRadioChange("bootCamp", e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default TrainingsCard;
