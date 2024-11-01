"use client";
import React, { useCallback, useEffect, useState } from "react";
import Grid2 from "@mui/material/Grid2";
import { Box, Button } from "@mui/material";
import LicenseDetailsCard from "./LicenseDetailsCard";
import TrainingsCard from "./TrainingsCard";
import LicenseExamCard from "./LicenseExamCard";
import {
  LicenseAndTrainingsWrapperLabels,
  LoadingSpinnerLabels,
  SnackBarLabels,
} from "@/constants/labels.enums";
import { AppDispatch, RootState } from "../../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { LicenseAndTrainings } from "@/interfaces/interfaces";
import {
  saveLicenseAndTrainings,
  setShowErrorAlert,
  setShowSuccessSnackbar,
} from "../../../../../store/details/LicenseAndTrainingsSlice";
import { dummyUserCode } from "@/constants/constant";
import SnackbarMessage from "../../SnackbarMessage";
import LoadingSpinner from "../../LoadingSpinner";

const LicenseAndTrainingsWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formLoading, setFormLoading] = useState(true);

  const {
    showSuccessSnackbar,
    error,
    showErrorAlert,
    loading,
    licenseAndTrainings: initialData,
  } = useSelector((state: RootState) => state.licenseAndTraining);

  // Usar el initialData solo para inicializar el estado
  const [licenseAndTrainings, setLicenseAndTrainings] =
    useState<LicenseAndTrainings>(initialData);

  const handleSubmit = async () => {
    licenseAndTrainings.userCode = dummyUserCode;
    dispatch(saveLicenseAndTrainings(licenseAndTrainings));
  };

  const handleCloseSnackbar = useCallback(() => {
    dispatch(setShowSuccessSnackbar(false));
    dispatch(setShowErrorAlert(false));
  }, [dispatch]);

  useEffect(() => {
    setFormLoading(true);

    const timer = setTimeout(() => {
      setFormLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSuccessSnackbar && !loading && !showErrorAlert && (
        <SnackbarMessage
          message={SnackBarLabels.licenseAndTrainingSuccess}
          open={showSuccessSnackbar}
          handleClose={handleCloseSnackbar}
          error={false}
        />
      )}

      {!showSuccessSnackbar && !loading && showErrorAlert && (
        <SnackbarMessage
          message={error.message || SnackBarLabels.licenseAndTrainingError}
          open={showSuccessSnackbar}
          handleClose={handleCloseSnackbar}
          error={true}
        />
      )}

      {loading || formLoading ? (
        <LoadingSpinner text={LoadingSpinnerLabels.details} />
      ) : (
        <>
          <Grid2
            container
            spacing={2}
            sx={{
              padding: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
              gap: "22px",
            }}
          >
            <Grid2>
              <LicenseDetailsCard
                licenseDetails={licenseAndTrainings}
                setLicenseDetails={(data) => {
                  setLicenseAndTrainings((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
              <LicenseExamCard
                licenseExam={licenseAndTrainings}
                setLicenseExam={(data) => {
                  setLicenseAndTrainings((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
            </Grid2>
            <Grid2>
              <TrainingsCard
                trainings={licenseAndTrainings}
                setTrainings={(data) => {
                  setLicenseAndTrainings((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
            </Grid2>
          </Grid2>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ marginTop: 2, marginBottom: "20px" }}
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {LicenseAndTrainingsWrapperLabels.button}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default LicenseAndTrainingsWrapper;
