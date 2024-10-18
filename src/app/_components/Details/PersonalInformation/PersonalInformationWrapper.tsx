"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button } from "@mui/material";
import PersonalDetailsCard from "./PersonalDetailsCard";
import ContactDetailsCard from "./ContactDetailsCard";
import FamilyDetailsCard from "./FamilyDetailsCard";
import { PersonalDetails } from "@/interfaces/interfaces";
import ProductCard from "./ProductCard";

const PersonalInformationWrapper = () => {
  // Estado para los datos de PersonalDetails y ContactDetails
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "Oswely",
    lastName: "Urbano",
    birthDate: {
      month: "September",
      day: 29,
      year: 1980,
    },
    product: "IUL",
    insured: "Yes",
  });

  const [contactDetails, setContactDetails] = useState({
    phoneNumber: "865 423 9581",
    phoneCode: "+1",
    email: "oswelyurbano@gmail.com",
    homeAddress: "299 MILLER RD apt 124, MAULDIN, SC 29662",
    businessAddress: "299 MILLER RD apt 124, MAULDIN, SC 29662",
  });

  const [familyDetails, setFamilyDetails] = useState({
    spouseName: "John Urbano",
  });

  const handleSave = () => {
    console.log("Personal Details:", personalDetails);
    console.log("Contact Details:", contactDetails);
    console.log("Family Details:", familyDetails);
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
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
          />
          <ProductCard
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
          />
        </Grid>
        <Grid>
          <ContactDetailsCard
            contactDetails={contactDetails}
            setContactDetails={setContactDetails}
          />
          <FamilyDetailsCard
            familyDetails={familyDetails}
            setFamilyDetails={setFamilyDetails}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ marginTop: 2, marginBottom: "20px" }}
      >
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default PersonalInformationWrapper;
