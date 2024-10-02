import { Box, Modal, useTheme } from "@mui/material";
import UploadAgentCapture from "./UploadAgentCapture";
import { useState } from "react";

import { ThemeMode } from "@/constants/config.enum";
interface AddAgentModalProps {
  open: boolean;
  handleClose: () => void;
  mode?: ThemeMode.DARK | ThemeMode.LIGHT;
}
interface FileWithPreview extends File {
  preview: string;
}

const AddAgentModal = ({ open, handleClose, mode }: AddAgentModalProps) => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);

  const theme = useTheme();
  console.log("AddAgentModal mode -> ", mode);
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
          maxWidth: "1024px",
          backgroundColor: theme.palette.background.default,
          border: `${"2px solid"} ${theme.palette.common.black}`,
          boxShadow: 24,
          p: 4,
        }}
      >
        <UploadAgentCapture
          file={files}
          setFieldValue={setFieldValue}
          error={false}
          handleCloseModal={handleClose}
        />
      </Box>
    </Modal>
  );
};

export default AddAgentModal;