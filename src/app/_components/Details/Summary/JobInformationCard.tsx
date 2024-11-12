import { JobInformationCardLabels } from "@/constants/labels.enums";
import { JobInformation } from "@/interfaces/interfaces";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface JobInformationCardProps {
  jobDetails: JobInformation;
}

const JobInformationCard = ({ jobDetails }: JobInformationCardProps) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}
          gap={2}
        >
          <Typography variant="h6">{JobInformationCardLabels.title}</Typography>
          <Link href="#" variant="body2">
            {JobInformationCardLabels.edit}
          </Link>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {JobInformationCardLabels.promotionDate}
            </Typography>
            <Typography>{jobDetails.promotionDate}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {JobInformationCardLabels.sinceInCompany}
            </Typography>
            <Typography>{jobDetails.partOfCompanySince}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />{" "}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {JobInformationCardLabels.eo}
            </Typography>
            <Typography>{jobDetails.eo ? "Yes" : "No"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {JobInformationCardLabels.appointed}
            </Typography>
            <Typography>{jobDetails.appointed}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobInformationCard;
