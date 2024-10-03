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

const AddAgentModal = ({ open, handleClose }: AddAgentModalProps) => {
  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const setFieldValue = (field: string, value: unknown) => {
    if (field === "files") {
      setFiles(value as FileWithPreview[]);
    }
  };

  const closeModal = () => {
    if (loading) return;
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          onClick: (event) => {
            closeModal();
            event.stopPropagation();
          },
        },
      }}
      disableEscapeKeyDown={loading}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "1024px",
          backgroundColor: theme.palette.background.default,
          border: `${"2px solid"} ${theme.palette.background.default}`,
          boxShadow: 24,
          p: 4,
        }}
      >
        <UploadAgentCapture
          file={files}
          setFieldValue={setFieldValue}
          error={false}
          handleCloseModal={handleClose}
          loading={loading}
          setLoading={setLoading}
        />
      </Box>
    </Modal>
  );
};

export default AddAgentModal;
