/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button, Stack, Typography, Link, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";

import {
  LoadingSpinnerLabels,
  UploadAgentPDFCaptureLabels,
} from "@/constants/labels.enums";

import useConfig from "@/hooks/useConfig";
import { defaultImageUploapError, ThemeMode } from "@/constants/config.enum";
import { defaultBlueColor } from "@/constants/constant";
import { AppDispatch, RootState } from "../../../../store/store";
import LoadingSpinner from "../LoadingSpinner";
import WarningIcon from "../WarningIcon";
import UploadFileIcon from "../UploapFileIcon";
import RejectionFiles from "../RejectionFiles";
import CloseIcon from "../CloseIcon";
import RecycleBinIcon from "../RecycleBinIcon";
import GenericInformation from "./GenericInformation";
import { processPdf, setShowErrorAlert } from "../../../../store/pdfSlice";

interface UploadAgentCaptureProps {
  error?: boolean;
  file: FileWithPreview[] | null;
  setFieldValue: (field: string, value: unknown) => void;
  sx?: object;
  handleCloseModal: () => void;
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

const UploadAgentCapturePdf = ({
  file,
  setFieldValue,
  sx,
  handleCloseModal,
}: UploadAgentCaptureProps) => {
  const theme = useTheme();
  const { mode } = useConfig();
  const dispatch = useDispatch<AppDispatch>();
  useState<FileWithPreview | null>(null);

  const { loading, extractedData, showErrorAlert, error } = useSelector(
    (state: RootState) => state.pdf
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: {
      "application/pdf": [], // PDFs
    },
    multiple: false,
    onDrop: (acceptedFiles: any) => {
      dispatch(setShowErrorAlert(false));
      setFieldValue(
        "files",
        acceptedFiles.map((file: FileWithPreview) =>
          Object.assign(file, {
            preview:
              file.type === "application/pdf"
                ? null
                : URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const closeModal = useCallback(() => {
    if (loading) return;
    if (typeof closeModal === "function") {
      handleCloseModal();
    }
  }, [loading, handleCloseModal]);

  const onRemoveScreenShot = useCallback(() => {
    if (loading) return;

    setFieldValue("files", null);
    dispatch(setShowErrorAlert(false));
  }, [loading, setFieldValue, dispatch]);

  const onSendPdf = () => {
    if (!file || file.length === 0) return;

    dispatch(setShowErrorAlert(false));
    dispatch(processPdf(file[0])).unwrap();
  };

  if (extractedData) {
    return (
      <GenericInformation data={extractedData} handleCloseModal={closeModal} />
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        ...sx,
      }}
    >
      {!loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 0px 16px 0px",
          }}
        >
          <Typography fontWeight={"bold"}>
            {UploadAgentPDFCaptureLabels.MODALTITLE}
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

      {loading && <LoadingSpinner text={LoadingSpinnerLabels.pdf} />}

      {!loading && (
        <DropzoneWrapper
          {...getRootProps()}
          sx={(theme) => ({
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: theme.palette.error.main,
              borderColor: theme.palette.common.black,
              bgcolor: theme.palette.background.default,
            }),
            ...(file && {
              padding: "0",
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
              <Typography
                color={theme.palette.text.primary}
                sx={{ fontWeight: 500 }}
              >
                {UploadAgentPDFCaptureLabels.CONTENTTITLE}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {UploadAgentPDFCaptureLabels.CONTENT}
                <Link href="#" color="primary">
                  {" "}
                  {UploadAgentPDFCaptureLabels.CHOSEIMAGE}
                </Link>
              </Typography>
            </Stack>
          )}
          {file && !loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1">
                {file[0]?.name || "Unnamed PDF"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                PDF File
              </Typography>
            </Box>
          )}
        </DropzoneWrapper>
      )}

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {showErrorAlert && (
        <Alert
          sx={{ marginTop: 2 }}
          variant="filled"
          severity="error"
          icon={<WarningIcon />}
        >
          {error.message || defaultImageUploapError.message}
        </Alert>
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
                {UploadAgentPDFCaptureLabels.REMOVEICON}
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
              {UploadAgentPDFCaptureLabels.CANCELBUTTON}
            </Button>

            <Button
              variant="contained"
              color="info"
              onClick={onSendPdf}
              disabled={!file || file?.length === 0}
              sx={{ textTransform: "none" }}
              disableElevation
            >
              <Typography sx={{ color: theme.palette.grey[100] }}>
                {UploadAgentPDFCaptureLabels.ADDBUTTON}
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadAgentCapturePdf;
