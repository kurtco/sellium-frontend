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
import { DetailsState } from "@/interfaces/interfaces";
import { PersonalInformationWrapperLabels } from "@/constants/labels.enums";
import { detailsDummyData } from "@/constants/constant";

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
    useState<DetailsState>(detailsDummyData);

  const handleSubmit = async () => {
    try {
      // Hacer la solicitud al API route de Next.js;
      const response = await fetch("/api/users/details/jobInformation", {
        method: "POST",
        body: JSON.stringify(personalInformation.personalInformation),
      });

      if (!response.ok) {
        throw new Error(
          `Error al guardar la información: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      console.log("Datos guardados con éxito:", responseData);

      // Aquí podrías mostrar una notificación de éxito o hacer algo más con la respuesta.
    } catch (error) {
      console.error("Error al guardar la información:", error);
      // Aquí podrías mostrar una notificación de error.
    }
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
            personalDetails={personalInformation.personalInformation}
            setPersonalDetails={(data) =>
              setPersonalInformation({ ...personalInformation, ...data })
            }
          />
          <ProductCard
            personalDetails={{ ...personalInformation.personalInformation }}
            setPersonalDetails={(data) => {
              console.log("<ProductCard data", data);

              // Aquí actualizas solo la propiedad anidada `personalInformation.personalInformation`
              setPersonalInformation((prevState) => ({
                ...prevState,
                personalInformation: {
                  ...prevState.personalInformation, // Copiamos todo el contenido actual de `personalInformation`
                  ...data, // Actualizamos solo las propiedades que han cambiado
                },
              }));
            }}
          />
        </Grid>
        <Grid>
          <ContactDetailsCard
            contactDetails={personalInformation.personalInformation}
            setContactDetails={(data) =>
              setPersonalInformation({ ...personalInformation, ...data })
            }
          />
          <FamilyDetailsCard
            familyDetails={personalInformation.personalInformation}
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
          onClick={handleSubmit}
          disabled={loading}
        >
          {PersonalInformationWrapperLabels.button}
        </Button>
      </Box>
    </>
  );
};

export default PersonalInformationWrapper;
