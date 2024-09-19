"use client";
import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";

interface UploadImageProps {
  onImageUpload: (base64: string) => void;
}

const UploadImage = ({ onImageUpload }: UploadImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/base64", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      onImageUpload(result.base64);
    } catch (error) {
      console.error("Error uploading the image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <Typography variant="h6" gutterBottom>
        Upload Image for Processing
      </Typography>
      <Button variant="contained" component="label" className="mb-2">
        Select Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {selectedFile && (
        <Typography variant="body2">
          Selected Image: {selectedFile.name}
        </Typography>
      )}
      {loading ? (
        <>
          <CircularProgress /> {/* Indicador de loading */}
          <p className="mt-2">Loading image...</p>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFile}
          className="mt-2"
        >
          Upload and Process
        </Button>
      )}
    </div>
  );
};

export default UploadImage;
