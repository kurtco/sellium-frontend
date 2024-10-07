import React from "react";
import { Box, Typography, Button, IconButton, useTheme } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { DuplicateUserMessageLabels } from "@/constants/labels.enums";
import CloseIcon from "./CloseIcon";

interface WarningMessageProps {
  title?: string;
  message?: string;
  onClose: () => void;
  userCode: string;
}

const WarningMessage = ({
  title,
  message,
  onClose,
  userCode,
}: WarningMessageProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <ErrorOutlineIcon sx={{ color: theme.palette.warning.main }} />
        <Typography variant="h6" fontWeight="bold" fontSize={"16px"}>
          {title || DuplicateUserMessageLabels.title}
        </Typography>
        <IconButton onClick={onClose} sx={{ marginLeft: "auto" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography sx={{ mb: 2, fontSize: "16px", mt: "16px" }}>
        {message || DuplicateUserMessageLabels.message}
        {userCode && userCode.trim() !== "" && (
          <>
            <strong>{userCode}</strong> {DuplicateUserMessageLabels.message2}
          </>
        )}
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          style={{ fontSize: "14px" }}
        >
          {DuplicateUserMessageLabels.button}
        </Button>
      </Box>
    </Box>
  );
};

export default WarningMessage;
