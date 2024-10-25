"use client";
import React, { useCallback, useState, useEffect } from "react";
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
import { PersonalInformation } from "@/interfaces/interfaces";
import {
  PersonalInformationWrapperLabels,
  SnackBarLabels,
} from "@/constants/labels.enums";
import { validateEmail } from "@/utils/commonFunctions";
import SnackbarMessage from "../../SnackbarMessage";

const PersonalInformationWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    showSuccessSnackbar,
    error,
    showErrorAlert,
    loading,
    personalInformation: initialData,
  } = useSelector((state: RootState) => state.personalInformation);

  // Usar el initialData solo para inicializar el estado
  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformation>(initialData);

  // Sincronizar el estado cuando el initialData cambie
  useEffect(() => {
    setPersonalInformation(initialData);
  }, [initialData]);

  const handleSubmit = async () => {
    dispatch(savePersonalInformation(personalInformation));
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
            personalDetails={personalInformation}
            setPersonalDetails={(data) => {
              console.log("<PersonalDetailsCard data", data);
              setPersonalInformation((prevState) => ({
                ...prevState,
                ...data,
              }));
            }}
          />
          <ProductCard
            personalDetails={personalInformation}
            setPersonalDetails={(data) => {
              console.log("<ProductCard data", data);
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
              console.log("<ContactDetailsCard data", data);
              setPersonalInformation((prevState) => ({
                ...prevState,
                ...data,
              }));
            }}
          />
          <FamilyDetailsCard
            familyDetails={personalInformation}
            setFamilyDetails={(data) => {
              console.log("<FamilyDetailsCard data", data);
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
  );
};

export default PersonalInformationWrapper;
