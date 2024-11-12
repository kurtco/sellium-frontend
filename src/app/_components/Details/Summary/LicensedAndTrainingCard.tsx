import {
  LicensedAndTrainingCardLabels,
  TrainingsCardLabels,
} from "@/constants/labels.enums";
import { LicenseAndTrainings } from "@/interfaces/interfaces";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface LicensedAndTrainingCardProps {
  licenseDetails: LicenseAndTrainings;
}

const LicensedAndTrainingCard = ({
  licenseDetails,
}: LicensedAndTrainingCardProps) => {
  const convertToOrientationArray = (data: LicenseAndTrainings): string[] => {
    if (!data) {
      return [""];
    }
    const result: string[] = [];

    if (data.orientation1) result.push(TrainingsCardLabels.orientation1);
    if (data.orientation2) result.push(TrainingsCardLabels.orientation2);
    if (data.orientation3) result.push(TrainingsCardLabels.orientation3);
    if (data.orientation4) result.push(TrainingsCardLabels.orientation4);
    if (data.bootCamp) result.push(TrainingsCardLabels.bootCampOrientation);

    return result;
  };

  const orientationArray = convertToOrientationArray(licenseDetails);
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}
          gap={2}
        >
          <Typography variant="h6">
            {LicensedAndTrainingCardLabels.title}
          </Typography>
          <Link href="#" variant="body2">
            {LicensedAndTrainingCardLabels.edit}
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.licenseType}
            </Typography>
            <Typography>{licenseDetails.licenseType}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.licenseExpires}
            </Typography>
            <Typography>{licenseDetails.expires}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />{" "}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.fastStart}
            </Typography>
            <Typography>{licenseDetails.fastStar ? "Yes" : "No"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.stateOfExam}
            </Typography>
            <Typography>{licenseDetails.state}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.examPresented}
            </Typography>
            <Typography>{licenseDetails.presented}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.examApproved}
            </Typography>
            <Typography>{licenseDetails.approved ? "Yes" : "No"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.trainingPerformed}
            </Typography>
            <Typography>
              {orientationArray.length > 0
                ? orientationArray.join(", ")
                : LicensedAndTrainingCardLabels.noTrainings}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LicensedAndTrainingCard;
