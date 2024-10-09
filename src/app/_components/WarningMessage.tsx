import React from "react";
import { Box, Typography, Button, IconButton, useTheme } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  DuplicateUserMessageLabels,
  RepresentativeTypeLabels,
} from "@/constants/labels.enums";
import CloseIcon from "./CloseIcon";

interface WarningMessageProps {
  title?: string;
  message?: string;
  onClose: () => void;
  userCode: string;
  showWarningIcon?: boolean;
  showCloseIcon?: boolean;
  showOneActionButton?: boolean;
  updateUserPosition: (representative: string) => Promise<void>;
}

const WarningMessage = ({
  title,
  message,
  onClose,
  userCode,
  showWarningIcon = true,
  showCloseIcon = true,
  showOneActionButton = true,
  updateUserPosition,
}: WarningMessageProps) => {
  const theme = useTheme();

  const handleCloseClick = () => {
    if (typeof handleCloseClick === "function") {
      onClose();
    }
  };

  const callUpdatePositionApi = async (representative: string) => {
    try {
      await updateUserPosition(representative);
      handleCloseClick();
    } catch (error) {
      console.error("Error updating user position:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "444px",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {showWarningIcon && (
          <ErrorOutlineIcon sx={{ color: theme.palette.warning.main }} />
        )}

        <Typography variant="h6" fontWeight="bold" fontSize={"16px"}>
          {title || DuplicateUserMessageLabels.title}
        </Typography>
        {showCloseIcon && (
          <IconButton
            onClick={() => handleCloseClick()}
            sx={{ marginLeft: "auto" }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Typography sx={{ mb: 2, fontSize: "16px", mt: "16px" }}>
        {message || DuplicateUserMessageLabels.message}
        {userCode && userCode.trim() !== "" && (
          <>
            <strong>{userCode}</strong> {DuplicateUserMessageLabels.message2}
          </>
        )}
      </Typography>

      {showOneActionButton ? (
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCloseClick()}
            style={{ fontSize: "14px" }}
          >
            {DuplicateUserMessageLabels.button}
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent="space-between"
          flex={1}
          gap={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              callUpdatePositionApi(RepresentativeTypeLabels.StudentButton)
            }
            disableElevation={true}
            sx={{ fontSize: "14px", width: "50%", borderRadius: "4px" }}
          >
            {RepresentativeTypeLabels.StudentButton}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              callUpdatePositionApi(RepresentativeTypeLabels.LicensedButton)
            }
            disableElevation={true}
            sx={{ fontSize: "14px", width: "50%", borderRadius: "4px" }}
          >
            {RepresentativeTypeLabels.LicensedButton}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default WarningMessage;
