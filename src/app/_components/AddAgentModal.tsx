import { Box, Modal, useTheme } from "@mui/material";
import UploadAgentCapture from "./UploadAgentCapture";
import { OcrServiceStatus } from "@/constants/config.enum";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { DataFromImage, FileWithPreview } from "@/interfaces/interfaces";
import WarningMessage from "./WarningMessage";
import { RepresentativeTypeLabels } from "@/constants/labels.enums";
import { updateUserPosition } from "../../../store/imageSlice";

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
  const dispatch = useDispatch<AppDispatch>();
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

  const requestNewUserPosition = (representative: string) => {
    if (loading) return;

    if (representative === "" || !representative) return;

    const userData = {
      ...dataFromImage,
      position: representative,
    } as DataFromImage;

    dispatch(updateUserPosition(userData))
      .unwrap()
      .then((result) => {
        console.log("User position updated successfully:", result);
      })
      .catch((error) => {
        console.error("Error updating user position:", error);
      });
  };

  const blockCloseModalbyClicking = (): boolean => {
    return (
      String(error.error) === String(OcrServiceStatus.UserRepresentiveType) ||
      String(error.error) === String(OcrServiceStatus.Conflict)
    );
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
            pointerEvents:
              loading || blockCloseModalbyClicking() ? "none" : "auto",
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
          width: showWarningMessage ? "444px" : "100%",
        }}
      >
        {showWarningMessage ? (
          <>
            {String(error.error) === String(OcrServiceStatus.Conflict) && (
              <WarningMessage
                userCode={error?.userCode?.toUpperCase() || ""}
                onClose={handleClose}
                updateUserPosition={requestNewUserPosition}
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
                updateUserPosition={requestNewUserPosition}
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
