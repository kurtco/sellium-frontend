import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DataFromImage } from "@/interfaces/interfaces";
import { defaultImageUploapError } from "@/constants/constant";

// Definimos un tipo para el error que esperamos recibir del backend
interface ErrorContent {
  error?: string;
  message?: string;
}

// Acción asíncrona para procesar la imagen con un tipo explícito para el valor rechazado
export const processImage = createAsyncThunk<
  DataFromImage, // Tipo de datos cuando la promesa se resuelve correctamente
  File, // Tipo del argumento (archivo) que se pasa a la función
  { rejectValue: ErrorContent } // Tipo del valor rechazado
>("image/processImage", async (file: File, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const base64Response = await fetch("/api/base64", {
      method: "POST",
      body: formData,
    });

    if (!base64Response.ok) {
      throw new Error("Error al convertir la imagen a base64");
    }

    const { base64 } = await base64Response.json();

    const processResponse = await fetch("/api/ocr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64 }),
    });

    if (!processResponse.ok) {
      const errorData: ErrorContent = await processResponse.json();
      return rejectWithValue(errorData); // Devolver el error usando rejectWithValue
    }

    const processedData = await processResponse.json();
    return processedData.data;
  } catch (error) {
    const errorContent: ErrorContent = {
      message: error instanceof Error ? error.message : defaultImageUploapError,
    };
    return rejectWithValue(errorContent);
  }
});

// Definimos el estado inicial con el error tipado correctamente
interface ImageState {
  loading: boolean;
  dataFromImage: DataFromImage | null;
  error: ErrorContent;
  showSnackbar: boolean;
}

const initialState: ImageState = {
  loading: false,
  dataFromImage: null,
  error: {
    error: "",
    message: "",
  },
  showSnackbar: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setShowSnackbar(state, action: PayloadAction<boolean>) {
      state.showSnackbar = action.payload;
    },
    resetImageState: (state) => {
      state.loading = false;
      state.dataFromImage = null;
      state.error = {
        error: "",
        message: "",
      };
      state.showSnackbar = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processImage.pending, (state) => {
        state.loading = true;
        state.error = {
          error: "",
          message: "",
        };
        state.showSnackbar = false;
      })
      .addCase(
        processImage.fulfilled,
        (state, action: PayloadAction<DataFromImage>) => {
          state.loading = false;
          state.dataFromImage = action.payload;
          state.showSnackbar = true;
        }
      )
      .addCase(
        processImage.rejected,
        (state, action: PayloadAction<ErrorContent | undefined>) => {
          state.loading = false;
          state.error = action.payload || {
            message: defaultImageUploapError,
          };
          state.showSnackbar = true;
        }
      );
  },
});

export const { setShowSnackbar, resetImageState } = imageSlice.actions;
export default imageSlice.reducer;
