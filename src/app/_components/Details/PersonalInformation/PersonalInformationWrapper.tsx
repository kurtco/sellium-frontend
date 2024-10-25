"use client";
import React, { useCallback, useState } from "react";
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
} from "../../../../../store/details/PersonalInformationSlice";
import { DetailsState } from "@/interfaces/interfaces";
import {
  PersonalInformationWrapperLabels,
  SnackBarLabels,
} from "@/constants/labels.enums";
import { detailsDummyData } from "@/constants/constant";
import { validateEmail } from "@/utils/commonFunctions";
import SnackbarMessage from "../../SnackbarMessage";

const PersonalInformationWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showSuccessSnackbar, error, showErrorAlert, loading } = useSelector(
    (state: RootState) => state.personalInformation
  );

  const [personalInformation, setPersonalInformation] =
    useState<DetailsState>(detailsDummyData);

  const handleSubmit = async () => {
    dispatch(savePersonalInformation(personalInformation.personalInformation));
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
          message={error.message}
          open={showSuccessSnackbar}
          handleClose={handleCloseSnackbar}
          error={true}
        />
      )}
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
            personalDetails={personalInformation.personalInformation}
            setPersonalDetails={(data) => {
              console.log("<PersonalDetailsCard data", data);
              setPersonalInformation((prevState) => ({
                ...prevState,
                personalInformation: {
                  ...prevState.personalInformation,
                  ...data,
                },
              }));
            }}
          />
          <ProductCard
            personalDetails={{ ...personalInformation.personalInformation }}
            setPersonalDetails={(data) => {
              // console.log("<ProductCard data", data);
              setPersonalInformation((prevState) => ({
                ...prevState,
                personalInformation: {
                  ...prevState.personalInformation,
                  ...data,
                },
              }));
            }}
          />
        </Grid>
        <Grid>
          <ContactDetailsCard
            contactDetails={personalInformation.personalInformation}
            setContactDetails={(data) => {
              // console.log("<ContactDetailsCard data", data);
              setPersonalInformation((prevState) => ({
                ...prevState,
                personalInformation: {
                  ...prevState.personalInformation,
                  ...data,
                },
              }));
            }}
          />
          <FamilyDetailsCard
            familyDetails={personalInformation.personalInformation}
            setFamilyDetails={(data) => {
              // console.log("<FamilyDetailsCard data", data);
              setPersonalInformation((prevState) => ({
                ...prevState,
                personalInformation: {
                  ...prevState.personalInformation,
                  ...data,
                },
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
            loading ||
            !!validateEmail(
              personalInformation?.personalInformation?.email || ""
            )
          }
        >
          {PersonalInformationWrapperLabels.button}
        </Button>
      </Box>
    </>
  );
};

export default PersonalInformationWrapper;
