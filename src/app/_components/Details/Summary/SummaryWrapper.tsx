import React from "react";
import DetailedInformation from "./DetailedInformation";
import SummaryCard from "./SummaryCard";
import Grid from "@mui/material/Grid2";

const SummaryWrapper = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
        gap: 2,
      }}
    >
      <Grid>
        <SummaryCard />
      </Grid>
      <Grid>
        <DetailedInformation />
      </Grid>
    </Grid>
  );
};

export default SummaryWrapper;
