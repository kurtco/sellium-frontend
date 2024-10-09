import { Box, Modal, useTheme } from "@mui/material";
import UploadAgentCapture from "./UploadAgentCapture";
import { OcrServiceStatus } from "@/constants/config.enum";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FileWithPreview } from "@/interfaces/interfaces";
import WarningMessage from "./WarningMessage";
import { RepresentativeTypeLabels } from "@/constants/labels.enums";

interface AddAgentModalProps {
  open: boolean;
  files: FileWithPreview[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
  handleClose: () => void;
}

const AddAgentModal = ({
  open,
  files,
  setFiles,
  handleClose,
}: AddAgentModalProps) => {
  const { loading, error, dataFromImage } = useSelector(
    (state: RootState) => state.image
  );
  const theme = useTheme();

  const showWarningMessage =
    String(error.error) === String(OcrServiceStatus.Conflict) ||
    String(error.error) === String(OcrServiceStatus.UserRepresentiveType);

  const setFieldValue = (field: string, value: unknown) => {
    if (field === "files") {
      setFiles(value as FileWithPreview[]);
    }
  };

  const updateUserPosition = async (representative: string) => {
    const userData = { ...dataFromImage, position: representative }; // Actualizamos el campo position

    console.log("new user ", userData);
    try {
      const response = await fetch("/api/users/newuser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error creating new user: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("User created successfully:", result);
    } catch (error) {
      console.error("Error creating new user:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          style: { pointerEvents: loading ? "none" : "auto" },
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
          width: showWarningMessage ? "444px" : "100%",
        }}
      >
        {showWarningMessage ? (
          <>
            {String(error.error) === String(OcrServiceStatus.Conflict) && (
              <WarningMessage
                userCode={error?.userCode?.toUpperCase() || ""}
                onClose={handleClose}
                updateUserPosition={updateUserPosition}
              />
            )}
            {String(error.error) ===
              String(OcrServiceStatus.UserRepresentiveType) && (
              <WarningMessage
                title={RepresentativeTypeLabels.title}
                message={RepresentativeTypeLabels.message}
                showOneActionButton={false}
                showCloseIcon={false}
                userCode=""
                onClose={handleClose}
                updateUserPosition={updateUserPosition}
              />
            )}
          </>
        ) : (
          <UploadAgentCapture
            file={files}
            setFieldValue={setFieldValue}
            error={false}
            handleCloseModal={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AddAgentModal;
