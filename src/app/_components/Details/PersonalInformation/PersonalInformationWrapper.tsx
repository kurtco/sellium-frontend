"use client";
import React, { useState } from "react";
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
import { PersonalInformationWrapperLabels } from "@/constants/labels.enums";

const PersonalInformationWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Usar useSelector para obtener el estado de Redux
  const loading = useSelector(
    (state: RootState) => state.personalInformation.loading
  );
  const showSuccessSnackbar = useSelector(
    (state: RootState) => state.personalInformation.showSuccessSnackbar
  );
  const showErrorAlert = useSelector(
    (state: RootState) => state.personalInformation.showErrorAlert
  );

  // Estado local para manejar los datos del formulario
  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformation>({
      firstName: "",
      lastName: "",
      dateOfBirth: "2/14/1982",
      insured: "",
      productType: "",
      phoneCode: "",
      phoneNumber: "",
      email: "",
      homeAddress: "",
      businessAddress: "",
      spouseName: "",
    });

  const handleSave = async () => {
    // Dispatch del thunk para guardar los datos en la API
    console.log(
      "data saved comp padre [PersonalInformationWrapper] ---> ",
      personalInformation
    );
    // await dispatch(
    //   savePersonalInformation(personalInformation as PersonalInformation)
    // );

    // // Muestra mensajes de éxito o error
    // if (showSuccessSnackbar) {
    //   dispatch(setShowSuccessSnackbar(true));
    //   console.log("Personal Information saved successfully!");
    // }
    // if (showErrorAlert) {
    //   dispatch(setShowErrorAlert(true));
    //   console.log("Error saving Personal Information");
    // }
  };

  return (
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
            setPersonalDetails={(data) =>
              setPersonalInformation({ ...personalInformation, ...data })
            }
          />
          <ProductCard
            personalDetails={personalInformation}
            setPersonalDetails={(data) =>
              setPersonalInformation({ ...personalInformation, ...data })
            }
          />
        </Grid>
        <Grid>
          <ContactDetailsCard
            contactDetails={personalInformation}
            setContactDetails={(data) =>
              setPersonalInformation({ ...personalInformation, ...data })
            }
          />
          <FamilyDetailsCard
            familyDetails={personalInformation}
            setFamilyDetails={(data) =>
              setPersonalInformation({ ...personalInformation, ...data })
            }
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
          onClick={handleSave}
          disabled={loading}
        >
          {PersonalInformationWrapperLabels.button}
        </Button>
      </Box>
    </>
  );
};

export default PersonalInformationWrapper;
