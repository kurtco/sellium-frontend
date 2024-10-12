import { LicensedAndTrainingCardLabels } from "@/constants/labels.enums";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const LicensedAndTrainingCard = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // Responsive layout for mobile and larger screens
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}
          gap={2} // Gap for spacing in mobile view
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
              {LicensedAndTrainingCardLabels.licenseIssue}
            </Typography>
            <Typography>License 214</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.licenseExpires}
            </Typography>
            <Typography>November 14, 2024</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />{" "}
        {/* Divider adicional para separar las secciones */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.fastStart}
            </Typography>
            <Typography>Yes</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.stateOfExam}
            </Typography>
            <Typography>Florida</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.examPresented}
            </Typography>
            <Typography>November 14, 2023</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.examApproved}
            </Typography>
            <Typography>Yes</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography variant="body2" color="textSecondary">
              {LicensedAndTrainingCardLabels.trainingPerformed}
            </Typography>
            <Typography>Orientation 1, 2, 3, 4 and Boot Camp</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LicensedAndTrainingCard;
