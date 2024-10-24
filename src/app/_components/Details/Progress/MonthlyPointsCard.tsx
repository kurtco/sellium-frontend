import { MonthlyPointsCardLabels } from "@/constants/labels.enums";
import {
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
  MenuItem,
  Select,
  Box,
  LinearProgress,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export interface MonthlyPoints {
  month: string;
  points: number;
  percentage: number;
}

interface MonthlyPointsCardProps {
  monthlyPoints: MonthlyPoints[];
  setMonthlyPoints: (points: MonthlyPoints[]) => void;
  year: number;
  setYear: (year: number) => void;
}

const MonthlyPointsCard = ({
  monthlyPoints,
  setMonthlyPoints,
  year,
  setYear,
}: MonthlyPointsCardProps) => {
  const handlePointsChange = (index: number, value: number) => {
    const updatedPoints = monthlyPoints.map((point, idx) =>
      idx === index ? { ...point, points: value } : point
    );
    setMonthlyPoints(updatedPoints);
  };
  const theme = useTheme();
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" marginBottom="16px">
          <Box gap={"16px"}>
            <Typography variant="h6" gutterBottom>
              {MonthlyPointsCardLabels.title}
            </Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              {MonthlyPointsCardLabels.sales}
            </Typography>
          </Box>

          <Select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            sx={{
              marginBottom: "22px",
              maxHeight: "40px",
              color: theme.palette.text.primary,
            }}
          >
            <MenuItem value={2024}>2024</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </Box>

        <Divider sx={{ marginBottom: "22px" }} />

        <Grid container spacing={2}>
          {monthlyPoints.map((point, index) => (
            <Grid
              key={index}
              container
              size={12}
              sx={{
                marginBottom: "22px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid size={12}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  gutterBottom
                  margin={0}
                >
                  {point.month}
                </Typography>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "22px",
                }}
              >
                {/* TextField para puntos */}
                <TextField
                  value={point.points}
                  onChange={(e) =>
                    handlePointsChange(index, Number(e.target.value))
                  }
                  variant="outlined"
                  sx={{
                    flexBasis: "100px",
                    marginRight: "22px",
                    maxHeight: "40px",
                    maxWidth: "107px",
                    paddingTop: 0,
                  }}
                  slotProps={{
                    input: {
                      style: {
                        padding: "0px",
                        height: "40px",
                        maxHeight: "40px",
                        maxWidth: "107px",
                      },
                    },
                  }}
                />

                {/* ProgressBar */}
                <LinearProgress
                  variant="determinate"
                  value={point.percentage}
                  sx={{ width: { xs: "100%", md: "60%" }, mx: 2 }}
                />

                <Typography
                  variant="body2"
                  sx={{ width: "50px", textAlign: "right" }}
                >
                  {point.percentage}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Typography
            variant="body2"
            color="primary"
            sx={{ marginBottom: "10px" }}
          >
            2,891 {MonthlyPointsCardLabels.upgradeToAssociated}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MonthlyPointsCard;
