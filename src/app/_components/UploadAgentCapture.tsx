/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDropzone } from "react-dropzone";
import Link from "@mui/material/Link";

// project import
import RejectionFiles from "./RejectionFiles";
import UploadFileIcon from "./UploapFileIcon";
import { UploadAgentCaptureLabels } from "@/constants/labels.enums";
import CloseIcon from "./CloseIcon";
import RecycleBinIcon from "./RecycleBinIcon";
import useConfig from "@/hooks/useConfig";
import { ThemeMode } from "@/constants/config.enum";
import { defaultBlueColor } from "@/constants/constant";

// Define los tipos de las props del componente
interface UploadAgentCaptureProps {
  error?: boolean;
  file: FileWithPreview[] | null;
  setFieldValue: (field: string, value: unknown) => void;
  sx?: object;
  handleCloseModal: () => void;
}

// Define un tipo para manejar el objeto File con la propiedad preview
interface FileWithPreview extends File {
  preview: string;
}

const DropzoneWrapper = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.default,
  border: `1px dashed ${theme.palette.grey[400]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
  textAlign: "center",
}));

const UploadAgentCapture = ({
  error,
  file,
  setFieldValue,
  sx,
  handleCloseModal,
}: UploadAgentCaptureProps) => {
  const theme = useTheme();
  const { mode } = useConfig();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles: any) => {
      setFieldValue(
        "files",
        acceptedFiles.map((file: FileWithPreview) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const onRemoveScreenShot = () => {
    setFieldValue("files", null);
  };

  const onSendScreenShot = () => {
    console.log("onSendScreenShot func");
  };

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 0px 16px 0px",
        }}
      >
        <Typography fontWeight={"bold"}>
          {UploadAgentCaptureLabels.MODALTITLE}
        </Typography>
        <Button
          disableElevation
          variant="outlined"
          onClick={handleCloseModal}
          startIcon={<CloseIcon />}
          sx={{
            paddingRight: 0,

            justifyContent: "flex-end",
            border: "none",
            boxShadow: "none",
            "&:hover": {
              border: "none",
              boxShadow: "none",
            },
          }}
        ></Button>
      </Box>

      <DropzoneWrapper
        {...getRootProps()}
        sx={(theme) => ({
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.light,
            bgcolor: theme.palette.error.lighter,
          }),
          ...(file && {
            padding: "0", // Remueve padding cuando hay imagen
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }),
        })}
      >
        <input {...getInputProps()} />

        {/* Si no hay archivo, muestra el contenido del dropzone */}
        {!file && (
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <UploadFileIcon />
            <Typography variant="h6" fontWeight={"bold"}>
              {UploadAgentCaptureLabels.CONTENTTITLE}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {UploadAgentCaptureLabels.CONTENT}
              <Link href="#" color="primary">
                {" "}
                {UploadAgentCaptureLabels.CHOSEIMAGE}
              </Link>
            </Typography>
          </Stack>
        )}

        {/* Si hay archivo, muestra la imagen adjuntada */}
        {file && (
          <CardMedia
            component="img"
            src={file[0].preview}
            sx={{
              width: "100%", // Ajusta el tamaño al 100% del contenedor
              maxHeight: "500px", // O ajusta esto según el tamaño máximo que quieras mostrar
              objectFit: "contain", // Asegura que la imagen se muestre correctamente
            }}
          />
        )}
      </DropzoneWrapper>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
      <Box
        sx={{
          paddingTop: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Button
            disableElevation
            variant="outlined"
            onClick={onRemoveScreenShot}
            disabled={!file || file?.length === 0}
            startIcon={
              <RecycleBinIcon disabled={!file || file?.length === 0} />
            }
            sx={{
              color:
                mode === ThemeMode.DARK
                  ? theme.palette.text.primary
                  : defaultBlueColor,
              textTransform: "none",
            }}
          >
            {UploadAgentCaptureLabels.REMOVEICON}
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Button
            variant="outlined"
            disableElevation
            onClick={handleCloseModal}
            sx={{ textTransform: "none" }}
          >
            {UploadAgentCaptureLabels.CANCELBUTTON}
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={onSendScreenShot}
            disabled={!file || file?.length === 0}
            sx={{ textTransform: "none" }}
            disableElevation
          >
            {UploadAgentCaptureLabels.ADDBUTTON}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadAgentCapture;
