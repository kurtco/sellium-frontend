"use client";
import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PersonalInformation } from "@/interfaces/interfaces";
import { ContactDetalilsCardLabels } from "@/constants/labels.enums";
import { internationalPhoneCodes } from "@/constants/constant";

interface ContactDetailsCardProps {
  contactDetails: PersonalInformation;
  setContactDetails: (details: Partial<PersonalInformation>) => void;
}

const ContactDetailsCard = ({
  contactDetails,
  setContactDetails,
}: ContactDetailsCardProps) => {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ marginBottom: "22px" }}>
      <Box
        sx={{
          marginBottom: 2,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 1,
          padding: "16px 0px 16px 20px ",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {ContactDetalilsCardLabels.title}
        </Typography>
      </Box>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {ContactDetalilsCardLabels.phoneNumber}
            </Typography>
            <FormControl fullWidth>
              <Select
                value={contactDetails.phoneCode}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    phoneCode: e.target.value,
                  })
                }
                sx={{
                  color: theme.palette.text.primary,
                }}
                renderValue={(value) => `${value}`}
              >
                {internationalPhoneCodes.map((code) => (
                  <MenuItem key={code.code} value={code.code}>
                    {`${code.code} (${code.country})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }} display="flex" alignItems="flex-end">
            <TextField
              fullWidth
              value={contactDetails.phoneNumber}
              onChange={(e) =>
                setContactDetails({
                  ...contactDetails,
                  phoneNumber: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid>

          <Grid size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {ContactDetalilsCardLabels.email}
            </Typography>
            <TextField
              fullWidth
              value={contactDetails.email}
              onChange={(e) =>
                setContactDetails({ ...contactDetails, email: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid size={12} sx={{ marginBottom: "22px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {ContactDetalilsCardLabels.homeAddress}
            </Typography>
            <TextField
              fullWidth
              value={contactDetails.homeAddress}
              onChange={(e) =>
                setContactDetails({
                  ...contactDetails,
                  homeAddress: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid>
          <Grid size={12} sx={{ marginBottom: "10px" }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {ContactDetalilsCardLabels.businessAddress}
            </Typography>
            <TextField
              fullWidth
              value={contactDetails.businessAddress}
              onChange={(e) =>
                setContactDetails({
                  ...contactDetails,
                  businessAddress: e.target.value,
                })
              }
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContactDetailsCard;
