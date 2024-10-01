import React from "react";
import DataTable from "./_components/DataTable/DataTable";
import Grid from "@mui/material/Grid2";

export default function Home() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        size={12}
        style={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "16px",
          paddingTop: "16px",
        }}
        // width={"100%"}
        // maxWidth={{ xs: "100%", sm: "80%", md: "70%" }}
      >
        <DataTable />
      </Grid>
    </Grid>
  );
}
