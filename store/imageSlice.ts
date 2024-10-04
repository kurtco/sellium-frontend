/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataFromImage } from "@/interfaces/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Acción asíncrona para procesar la imagen
export const processImage = createAsyncThunk(
  "image/processImage",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Convertir a base64
      const base64Response = await fetch("/api/base64", {
        method: "POST",
        body: formData,
      });

      if (!base64Response.ok) {
        throw new Error("Error al convertir la imagen a base64");
      }

      const { base64 } = await base64Response.json();

      // Procesar la imagen
      const processResponse = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      if (!processResponse.ok) {
        throw new Error("Error al procesar la imagen");
      }

      const processedData = await processResponse.json();
      return processedData.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface ImageState {
  loading: boolean;
  dataFromImage: DataFromImage | null;
  error: string | null;
  showSnackbar: boolean;
}

const initialState: ImageState = {
  loading: false,
  dataFromImage: null,
  error: null,
  showSnackbar: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    // action to trigger from the UI
    setShowSnackbar(state, action) {
      state.showSnackbar = action.payload;
    },
    resetImageState: (state) => {
      state.loading = false;
      state.dataFromImage = null;
      state.error = null;
      state.showSnackbar = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.showSnackbar = false;
      })
      .addCase(processImage.fulfilled, (state, action) => {
        state.loading = false;
        state.dataFromImage = action.payload;
        state.showSnackbar = true;
      })
      .addCase(processImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setShowSnackbar, resetImageState } = imageSlice.actions; // Let's import the actions to handle the snack bar throughout the UI.
export default imageSlice.reducer;
