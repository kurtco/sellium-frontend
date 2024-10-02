import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "./AddIcon";
import { ButtonsLabels } from "@/constants/labels.enums";
import AddAgentModal from "./AddAgentModal";
import useConfig from "@/hooks/useConfig";

const AddAgentButton = () => {
  const { mode } = useConfig();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
        onClick={handleOpen}
      >
        {ButtonsLabels.ADDAGENT}
      </Button>

      <AddAgentModal open={open} handleClose={handleClose} />
    </>
  );
};

export default AddAgentButton;
