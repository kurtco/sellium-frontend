import { Box, Modal, useTheme } from "@mui/material";
import UploadAgentCapturePdf from "./UploadAgentCapturePdf";
import { FileWithPreview } from "@/interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface AddAgentModalProps {
  open: boolean;
  files: FileWithPreview[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
  handleClose: () => void;
}

const AddAgentPdfModal = ({
  open,
  files,
  setFiles,
  handleClose,
}: AddAgentModalProps) => {
  const theme = useTheme();

  const { loading } = useSelector((state: RootState) => state.pdf);

  const setFieldValue = (field: string, value: unknown) => {
    if (field === "files") {
      setFiles(value as FileWithPreview[]);
    }
  };

  const blockCloseModalbyClicking = (): boolean => {
    return true;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          style: {
            pointerEvents: blockCloseModalbyClicking() ? "none" : "auto",
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
          border: `2px solid ${theme.palette.background.default}`,
          boxShadow: 24,
          p: 4,
          borderRadius: "4px",
          width: "100%",
        }}
      >
        <UploadAgentCapturePdf
          file={files}
          setFieldValue={setFieldValue}
          handleCloseModal={handleClose}
        />
      </Box>
    </Modal>
  );
};

export default AddAgentPdfModal;
