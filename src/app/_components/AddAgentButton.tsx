import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { ButtonsLabels } from "@/constants/labels.enums";
import AddAgentModal from "./AddAgentModal";
import { resetImageState } from "../../../store/imageSlice";
import { AppDispatch } from "../../../store/store";
import { FileWithPreview } from "@/interfaces/interfaces";

const AddAgentButton = () => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen(true);
    dispatch(resetImageState());
  };

  const handleClose = () => {
    setOpen(false);
    setFiles(null);
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

      <AddAgentModal
        open={open}
        files={files}
        setFiles={setFiles}
        handleClose={handleClose}
      />
    </>
  );
};

export default AddAgentButton;
