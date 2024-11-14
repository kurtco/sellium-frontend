import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { RepresentativeTypeLabels } from "@/constants/labels.enums";
import CloseIcon from "./CloseIcon";
import { AgentsPositions } from "@/constants/config.enum";

interface RepresentativeTypeMessageProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: AgentsPositions) => void;
}

const RepresentativeTypeMessage = ({
  open,
  onClose,
  onSelect,
}: RepresentativeTypeMessageProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      style={{ borderRadius: 4 }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" fontWeight="bold" fontSize={16}>
            {RepresentativeTypeLabels.title}
          </Typography>
          <Button onClick={onClose} sx={{ marginLeft: "auto", padding: 0 }}>
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 3 }} fontSize={14}>
          {RepresentativeTypeLabels.message}
        </Typography>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSelect(AgentsPositions.Student)}
            sx={{ flexGrow: 1, fontSize: "14px", textTransform: "none" }}
          >
            <Typography fontSize={14}>
              {RepresentativeTypeLabels.StudentButton}
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSelect(AgentsPositions.Licensed)}
            sx={{ flexGrow: 1, fontSize: "14px", textTransform: "none" }}
          >
            <Typography fontSize={14}>
              {RepresentativeTypeLabels.LicensedButton}
            </Typography>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RepresentativeTypeMessage;
