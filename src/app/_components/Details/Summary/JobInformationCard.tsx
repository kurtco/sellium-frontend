import { JobInformationCardLabels } from "@/constants/labels.enums";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const JobInformationCard = () => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }} // Responsive layout for mobile and larger screens
          justifyContent="space-between"
          alignItems="center"
          textAlign={{ xs: "center", md: "left" }}
          gap={2} // Gap for spacing in mobile view
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
            <Typography>September 29, 2024</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {JobInformationCardLabels.sinceInCompany}
            </Typography>
            <Typography>September 29, 2020</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />{" "}
        {/* Divider adicional para separar las secciones */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {JobInformationCardLabels.eo}
            </Typography>
            <Typography>Yes</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="textSecondary">
              {JobInformationCardLabels.appointed}
            </Typography>
            <Typography>
              American Equity Investment Life Ins Co, ANICO, +6
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default JobInformationCard;
