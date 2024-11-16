import React from "react";
import DetailedInformation from "./DetailedInformation";
import SummaryCard from "./SummaryCard";
import Grid from "@mui/material/Grid2";
import { RootState } from "../../../../../store/store";
import { useSelector } from "react-redux";
import { LoadingSpinnerLabels } from "@/constants/labels.enums";
import LoadingSpinner from "../../LoadingSpinner";
import { PersonalInformation } from "@/interfaces/interfaces";

const SummaryWrapper = () => {
  const { data: personalInformationData } = useSelector(
    (state: RootState) =>
      state.userDetails.personalInformation.personalInformation
  );

  const { data: jobInformation } = useSelector(
    (state: RootState) => state.userDetails.jobInformation.jobInformation
  );

  const { data: licenseAndTrainings } = useSelector(
    (state: RootState) =>
      state.userDetails.licenseAndTrainings.licenseAndTrainings
  );

  const { data: user, loading: userLoading } = useSelector(
    (state: RootState) => state.userDetails.userOverview.user
  );

  return (
    <>
      {userLoading ? (
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
            <SummaryCard userDetails={user} />
          </Grid>
          <Grid>
            <DetailedInformation
              personalDetails={personalInformationData as PersonalInformation}
              jobDetails={jobInformation}
              licenseDetails={licenseAndTrainings}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SummaryWrapper;
