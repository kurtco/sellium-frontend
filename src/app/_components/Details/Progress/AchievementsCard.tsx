"use client";
import { AchievementsCardLabels } from "@/constants/labels.enums";
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

export interface Achievements {
  isCoach: boolean;
  netLicense: boolean;
}

interface AchievementsCardProps {
  achievements: Achievements;
  setAchievements: (achievements: Achievements) => void;
}

const AchievementsCard = ({
  achievements,
  setAchievements,
}: AchievementsCardProps) => {
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
          {AchievementsCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid2 container spacing={2}>
          {/* Is a Coach */}
          <Grid2 size={12}>
            <Typography variant="body2">
              {AchievementsCardLabels.isACoach}
            </Typography>
            <RadioGroup
              row
              value={achievements.isCoach ? "Yes" : "No"}
              onChange={(e) =>
                setAchievements({
                  ...achievements,
                  isCoach: e.target.value === "Yes",
                })
              }
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid2>

          {/* Net License */}
          <Grid2 size={12}>
            <Typography variant="body2">
              {AchievementsCardLabels.netLicense}
            </Typography>
            <RadioGroup
              row
              value={achievements.netLicense ? "Yes" : "No"}
              onChange={(e) =>
                setAchievements({
                  ...achievements,
                  netLicense: e.target.value === "Yes",
                })
              }
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

export default AchievementsCard;
