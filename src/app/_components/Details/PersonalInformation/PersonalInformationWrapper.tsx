"use client";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Grid from "@mui/material/Grid2";
import { Box, Button } from "@mui/material";
import PersonalDetailsCard from "./PersonalDetailsCard";
import ContactDetailsCard from "./ContactDetailsCard";
import FamilyDetailsCard from "./FamilyDetailsCard";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import {
  savePersonalInformation,
  setShowErrorAlert,
  setShowSuccessSnackbar,
} from "../../../../../store/details/personalInformationSlice";
import { PersonalInformation } from "@/interfaces/interfaces";
import {
  LoadingSpinnerLabels,
  PersonalInformationWrapperLabels,
  SnackBarLabels,
} from "@/constants/labels.enums";
import { validateEmail } from "@/utils/commonFunctions";
import SnackbarMessage from "../../SnackbarMessage";
import LoadingSpinner from "../../LoadingSpinner";

const PersonalInformationWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const userCode = params.id as string;

  const {
    data: initialData,
    loading,
    showSuccessSnackbar,
    showErrorAlert,
    error,
  } = useSelector((state: RootState) => state.userDetails.personalInformation);

  const { loading: gettingDetailsloading } = useSelector(
    (state: RootState) => state.userDetails.userOverview.user
  );
  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformation>(initialData);

  useEffect(() => {
    if (initialData) {
      setPersonalInformation(initialData);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    const updatedPersonalInformation = {
      ...personalInformation,
      userCode: userCode,
    };
    dispatch(savePersonalInformation(updatedPersonalInformation));
  };

  const handleCloseSnackbar = useCallback(() => {
    dispatch(setShowSuccessSnackbar(false));
    dispatch(setShowErrorAlert(false));
  }, [dispatch]);

  return (
    <>
      {showSuccessSnackbar && !loading && !showErrorAlert && (
        <SnackbarMessage
          message={SnackBarLabels.personalInformationSuccess}
          open={showSuccessSnackbar}
          handleClose={handleCloseSnackbar}
          error={false}
        />
      )}

      {!showSuccessSnackbar && !loading && showErrorAlert && (
        <SnackbarMessage
          message={error.message || SnackBarLabels.personalInformationError}
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
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: "22px",
            }}
          >
            <Grid>
              <PersonalDetailsCard
                personalDetails={personalInformation}
                setPersonalDetails={(data) => {
                  setPersonalInformation((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
              <ProductCard
                personalDetails={personalInformation}
                setPersonalDetails={(data) => {
                  setPersonalInformation((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
            </Grid>
            <Grid>
              <ContactDetailsCard
                contactDetails={personalInformation}
                setContactDetails={(data) => {
                  setPersonalInformation((prevState) => ({
                    ...prevState,
                    ...data,
                  }));
                }}
              />
              <FamilyDetailsCard
                familyDetails={personalInformation}
                setFamilyDetails={(data) => {
                  setPersonalInformation((prevState) => ({
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={
                loading || !!validateEmail(personalInformation?.email || "")
              }
            >
              {PersonalInformationWrapperLabels.button}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonalInformationWrapper;
