import React from "react";
import { Snackbar, IconButton } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import CloseIcon from "./CloseIcon";

interface SnackbarMessageProps {
  message: string;
  open: boolean;
  handleClose: () => void;
}

const SnackbarMessage = ({
  message,
  open,
  handleClose,
}: SnackbarMessageProps) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      ContentProps={{
        sx: {
          backgroundColor: "#4caf50", // Fondo verde
          color: theme.palette.common.white,
          padding: theme.spacing(1.5),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon iconWhite={true} />
        </IconButton>
      }
    />
  );
};

export default SnackbarMessage;
