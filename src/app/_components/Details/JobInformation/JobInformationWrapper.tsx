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
import { dummyUserCode } from "@/constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import {
  saveJobInformation,
  setShowErrorAlert,
  setShowSuccessSnackbar,
} from "../../../../../store/details/JobInformationSlice";
import SnackbarMessage from "../../SnackbarMessage";
import LoadingSpinner from "../../LoadingSpinner";

const JobInformationWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formLoading, setFormLoading] = useState(true);

  const {
    showSuccessSnackbar,
    error,
    showErrorAlert,
    loading,
    jobInformation: initialData,
    user,
  } = useSelector((state: RootState) => state.jobInformation);

  const { loading: gettingDetailsloading } = useSelector(
    (state: RootState) => state.userDetailsTabs
  );

  const [jobInformation, setJobInformation] =
    useState<JobInformation>(initialData);
  const [jobDependencies, setJobDependencies] = useState<Users>(user);

  useEffect(() => {
    if (!initialData.position && user?.position) {
      setJobInformation((prevState) => ({
        ...prevState,
        position: user.position || prevState.position,
      }));
    }

    setJobDependencies(user);

    setFormLoading(true);
    const timer = setTimeout(() => {
      setFormLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [initialData, user]);

  const handleSubmit = async () => {
    const dataToSave = {
      recruiter: jobDependencies?.recruiterName,
      recruiterCode: jobDependencies?.recruiterCode,
      leaderName: jobDependencies?.leaderName,
      userCode: dummyUserCode,
      position: jobInformation?.position,
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
      {gettingDetailsloading || formLoading ? (
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
                jobDetails={jobInformation}
                setJobDetails={(data) => {
                  console.log("<JobDetailsCard data", data);
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
