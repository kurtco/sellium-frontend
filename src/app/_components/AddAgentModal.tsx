import { Box, Modal } from "@mui/material";
import UploadAgentCapture from "./UploadAgentCapture";
import { useState } from "react";

interface AddAgentModalProps {
  open: boolean;
  handleClose: () => void;
}
interface FileWithPreview extends File {
  preview: string;
}

const AddAgentModal = ({ open, handleClose }: AddAgentModalProps) => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);

  const setFieldValue = (field: string, value: unknown) => {
    if (field === "files") {
      setFiles(value as FileWithPreview[]);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <UploadAgentCapture
          file={files}
          setFieldValue={setFieldValue}
          error={false}
        />
      </Box>
    </Modal>
  );
};

export default AddAgentModal;
