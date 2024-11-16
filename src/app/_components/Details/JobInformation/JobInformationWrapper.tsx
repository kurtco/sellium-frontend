"use client";
import React, { useCallback, useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import JobDetailsCard from "./JobDetailsCard";
import JobDependenciesCard from "./JobDependenciesCard";
import { Box, Button } from "@mui/material";
import {
  JobInformationWrapperLabels,
  LoadingSpinnerLabels,
  SnackBarLabels,
} from "@/constants/labels.enums";
import { JobInformation, Users } from "@/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import {
  saveJobInformation,
  setShowErrorAlert,
  setShowSuccessSnackbar,
} from "../../../../../store/details/jobInformationSlice";
import SnackbarMessage from "../../SnackbarMessage";
import LoadingSpinner from "../../LoadingSpinner";
import { useParams } from "next/navigation";

const JobInformationWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const userCode = params.id as string;

  const {
    data: jobInformationData,
    loading,
    showSuccessSnackbar,
    showErrorAlert,
    error,
  } = useSelector((state: RootState) => state.userDetails.jobInformation);

  const { loading: gettingDetailsloading, data: userData } = useSelector(
    (state: RootState) => state.userDetails.userOverview
  );
  const [jobInformation, setJobInformation] =
    useState<JobInformation>(jobInformationData);
  const [jobDependencies, setJobDependencies] = useState<Users>(userData);

  useEffect(() => {
    if (userData?.position) {
      setJobInformation((prevState) => ({
        ...prevState,
        position: userData.position || prevState.position,
      }));
    }
    setJobDependencies(userData);
  }, [jobInformationData, userData]);

  const handleSubmit = async () => {
    const dataToSave = {
      recruiter: jobDependencies?.recruiterName,
      recruiterCode: jobDependencies?.recruiterCode,
      leaderName: jobDependencies?.leaderName,
      userCode: userCode,
      position: jobDependencies?.position,
      promotionDate: jobInformation.promotionDate,
      personalCode: jobInformation.personalCode,
      partOfCompanySince: jobInformation.partOfCompanySince,
      eo: jobInformation.eo,
      appointed: jobInformation.appointed,
    } as JobInformation;

    dispatch(saveJobInformation(dataToSave));
  };

  const handleCloseSnackbar = useCallback(() => {
    dispatch(setShowSuccessSnackbar(false));
    dispatch(setShowErrorAlert(false));
  }, [dispatch]);

  return (
    <>
      {showSuccessSnackbar && !loading && !showErrorAlert && (
        <SnackbarMessage
          message={SnackBarLabels.jobInformationSuccess}
          open={showSuccessSnackbar}
          handleClose={handleCloseSnackbar}
          error={false}
        />
      )}

      {!showSuccessSnackbar && !loading && showErrorAlert && (
        <SnackbarMessage
          message={error.message || SnackBarLabels.jobInformationError}
          open={showSuccessSnackbar}
          handleClose={handleCloseSnackbar}
          error={true}
        />
      )}
      {gettingDetailsloading || loading ? (
        <LoadingSpinner text={LoadingSpinnerLabels.details} />
      ) : (
        <>
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
              <JobDetailsCard
                personalInfoData={jobInformation}
                userData={jobDependencies}
                setUserData={(data) => {
                  setJobDependencies((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
                setPersonalInfoData={(data) => {
                  setJobInformation((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
            </Grid>
            <Grid>
              <JobDependenciesCard
                jobDependencies={jobDependencies}
                setJobDependencies={(data) => {
                  setJobDependencies((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ marginTop: 2, marginBottom: "20px" }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {JobInformationWrapperLabels.button}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default JobInformationWrapper;
