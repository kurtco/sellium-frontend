/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import {
  LoadingSpinnerLabels,
  UploadAgentCaptureLabels,
} from "@/constants/labels.enums";
import CloseIcon from "./CloseIcon";
import RecycleBinIcon from "./RecycleBinIcon";
import useConfig from "@/hooks/useConfig";
import { ThemeMode } from "@/constants/config.enum";
import { defaultBlueColor } from "@/constants/constant";
import LoadingSpinner from "./LoadingSpinner";
import { DataFromImage } from "@/interfaces/interfaces";
import { AppDispatch, RootState } from "../../../store/store";
import { processImage } from "../../../store/imageSlice";

interface UploadAgentCaptureProps {
  error?: boolean;
  file: FileWithPreview[] | null;
  setFieldValue: (field: string, value: unknown) => void;
  sx?: object;
  handleCloseModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

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
  file,
  setFieldValue,
  sx,
  handleCloseModal,
}: UploadAgentCaptureProps) => {
  const theme = useTheme();
  const { mode } = useConfig();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, dataFromImage, error } = useSelector(
    (state: RootState) => state.image
  );

  useState<DataFromImage | null>(null);

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

  const closeModal = useCallback(() => {
    if (loading) return;
    handleCloseModal();
  }, [loading, handleCloseModal]);

  const onRemoveScreenShot = useCallback(() => {
    if (loading) return;
    setFieldValue("files", null);
  }, [loading, setFieldValue]);

  useEffect(() => {
    if (!dataFromImage || !dataFromImage?.userCode || loading) {
      return;
    }
    onRemoveScreenShot();
    closeModal();
  }, [loading, dataFromImage, onRemoveScreenShot, closeModal]);

  const onSendScreenShot = () => {
    if (!file || file.length === 0) return;
    dispatch(processImage(file[0]));
  };

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {!loading && (
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
            onClick={closeModal}
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
      )}

      {error && <Typography color="error">{error}</Typography>}
      {loading && <LoadingSpinner text={LoadingSpinnerLabels.message} />}

      {!loading && (
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
              padding: "0", // removing padding when there is a image
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }),
          })}
        >
          <input {...getInputProps()} />

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

          {file && !loading && (
            <CardMedia
              component="img"
              src={file[0].preview}
              sx={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          )}
        </DropzoneWrapper>
      )}

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {!loading && (
        <Box
          sx={{
            paddingTop: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {file && file?.length > 0 && (
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
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 2,
              flexGrow: 1,
            }}
          >
            <Button
              variant="outlined"
              disableElevation
              onClick={closeModal}
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
              <Typography sx={{ color: theme.palette.grey[100] }}>
                {UploadAgentCaptureLabels.ADDBUTTON}
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadAgentCapture;
