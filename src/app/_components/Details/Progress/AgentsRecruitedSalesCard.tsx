import { AgentsRecruitedSalesCardLabels } from "@/constants/labels.enums";
import { Card, CardContent, TextField, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

export interface AgentsDetails {
  numberOfAgents: number;
  numberOfPoliciesSold: number;
  isCoach: boolean;
  netLicense: boolean;
}

interface AgentsRecruitedSalesCardProps {
  agentsDetails: AgentsDetails;
  setAgentsDetails: (details: AgentsDetails) => void;
}

const AgentsRecruitedSalesCard = ({
  agentsDetails,
  setAgentsDetails,
}: AgentsRecruitedSalesCardProps) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: "22px" }}>
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
          {AgentsRecruitedSalesCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={12} marginTop="22px">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" gutterBottom>
                {AgentsRecruitedSalesCardLabels.numberOfAgents}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                justifyContent="flex-end"
                sx={{ marginBottom: "10px" }}
              >
                2 {AgentsRecruitedSalesCardLabels.upgradeToAssociated}
              </Typography>
            </Box>

            <TextField
              fullWidth
              value={agentsDetails.numberOfAgents}
              onChange={(e) =>
                setAgentsDetails({
                  ...agentsDetails,
                  numberOfAgents: Number(e.target.value),
                })
              }
              // helperText={`1 ${AgentsRecruitedSalesCardLabels.helperText}`}
            />
          </Grid2>

          <Grid2 size={12}>
            <Typography variant="body2" gutterBottom>
              {AgentsRecruitedSalesCardLabels.policiesSold}
            </Typography>
            <TextField
              fullWidth
              value={agentsDetails.numberOfPoliciesSold}
              onChange={(e) =>
                setAgentsDetails({
                  ...agentsDetails,
                  numberOfPoliciesSold: Number(e.target.value),
                })
              }
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default AgentsRecruitedSalesCard;
