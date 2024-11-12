import React from "react";
import DetailedInformation from "./DetailedInformation";
import SummaryCard from "./SummaryCard";
import Grid from "@mui/material/Grid2";
import { RootState } from "../../../../../store/store";
import { useSelector } from "react-redux";
import { LoadingSpinnerLabels } from "@/constants/labels.enums";
import LoadingSpinner from "../../LoadingSpinner";

const SummaryWrapper = () => {
  const { loading: gettingDetailsloading, userDetails } = useSelector(
    (state: RootState) => state.userDetailsTabs
  );
  const { jobInformation, personalInformation, licenseAndTraining } =
    useSelector((state: RootState) => state);

  return (
    <>
      {gettingDetailsloading ? (
        <LoadingSpinner text={LoadingSpinnerLabels.details} />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            padding: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
            gap: "22px",
          }}
        >
          <Grid>
            <SummaryCard userDetails={userDetails.user} />
          </Grid>
          <Grid>
            <DetailedInformation
              personalDetails={personalInformation.personalInformation}
              jobDetails={jobInformation.jobInformation}
              licenseDetails={licenseAndTraining.licenseAndTrainings}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SummaryWrapper;
