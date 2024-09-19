"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import UploadImage from "./UploadImage";
import { DataFromImage } from "../interfaces/interfaces";

const DataTable = () => {
  const [dataFromImage, setDataFromImage] = useState<DataFromImage | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (base64: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const result = await response.json();
      setDataFromImage(result.data);
    } catch (error) {
      console.error("Error fetching OCR data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
        <p className="mt-2">Processing image...</p>
      </div>
    );
  }

  return (
    <>
      <UploadImage onImageUpload={handleImageUpload} />
      {dataFromImage && dataFromImage.userCode ? (
        <TableContainer component={Paper} className="p-4 shadow-lg">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Leader</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Recruiter Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{dataFromImage.userName}</TableCell>
                <TableCell align="right">{dataFromImage.leaderName}</TableCell>
                <TableCell align="right">{dataFromImage.phone}</TableCell>
                <TableCell align="right">{dataFromImage.email}</TableCell>
                <TableCell align="right">{dataFromImage.position}</TableCell>
                <TableCell align="right">
                  {dataFromImage.recruiterCode}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body2">
          No data available. Please upload an image.
        </Typography>
      )}
    </>
  );
};

export default DataTable;
