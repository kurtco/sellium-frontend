import React from "react";
import { Button } from "@mui/material";

import { ButtonsLabels } from "@/constants/labels.enums";
import AddIcon from "./AddIcon";

const AddAgentButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      startIcon={<AddIcon />}
      sx={{
        width: "140px",
        height: "36px",
        borderRadius: "4px",
        textTransform: "none",
        padding: "6px 16px",
        fontWeight: "bold",
      }}
    >
      {ButtonsLabels.ADDAGENT}
    </Button>
  );
};

export default AddAgentButton;
