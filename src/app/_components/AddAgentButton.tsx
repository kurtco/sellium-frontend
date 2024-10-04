import React, { useState } from "react";
import { Button } from "@mui/material";
import { ButtonsLabels } from "@/constants/labels.enums";
import AddAgentModal from "./AddAgentModal";
import { FileWithPreview } from "@/interfaces/interfaces";

const AddAgentButton = () => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setFiles(null);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disableElevation
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

      {open && (
        <AddAgentModal
          open={open}
          handleClose={handleClose}
          files={files}
          setFiles={setFiles}
        />
      )}
    </>
  );
};

export default AddAgentButton;
