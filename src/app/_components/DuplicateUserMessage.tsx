import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import WarningIcon from "./WarningIcon";
import { DuplicateUserMessageLabels } from "@/constants/labels.enums";
import CloseIcon from "./CloseIcon";

interface DuplicateUserMessageProps {
  open: boolean;
  onClose: () => void;
  userCode: string;
}

const DuplicateUserMessage = ({
  open,
  onClose,
  userCode,
}: DuplicateUserMessageProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      style={{ borderRadius: 4 }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon />
          <Typography variant="h6" fontWeight="bold" fontSize={"16px"}>
            {DuplicateUserMessageLabels.title}
          </Typography>
          <IconButton onClick={onClose} sx={{ marginLeft: "auto" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2, fontSize: "16px" }}>
          {DuplicateUserMessageLabels.message}
          <strong>{userCode}</strong> {DuplicateUserMessageLabels.message2}
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
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateUserMessage;
