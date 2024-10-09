import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DataFromImage, ErrorResponse } from "@/interfaces/interfaces";
import { defaultImageUploapError } from "@/constants/config.enum";

export const processImage = createAsyncThunk<
  DataFromImage, // Tipo de datos cuando la promesa se resuelve correctamente
  File, // Tipo del argumento (archivo) que se pasa a la función
  { rejectValue: ErrorResponse } // Tipo del valor rechazado
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
      const errorData: ErrorResponse = await processResponse.json();
      return rejectWithValue(errorData); // Devolver el error usando rejectWithValue
    }

    const processedData = await processResponse.json();
    return processedData.data;
  } catch (error) {
    const errorContent: ErrorResponse = {
      message:
        error instanceof Error
          ? error.message
          : defaultImageUploapError.message,
    };
    return rejectWithValue(errorContent);
  }
});

// Definimos el estado inicial con el error tipado correctamente
interface ImageState {
  loading: boolean;
  dataFromImage: DataFromImage | null;
  error: ErrorResponse;
  showSuccessSnackbar: boolean;
}

const initialState: ImageState = {
  loading: false,
  dataFromImage: null,
  error: {
    error: "",
    message: "",
    userCode: "",
  },
  showSuccessSnackbar: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setshowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    resetImageState: (state) => {
      return {
        ...state,
        loading: false,
        error: {
          error: "",
          message: "",
          userCode: "",
        },
        showSuccessSnackbar: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processImage.pending, (state) => {
        state.loading = true;
        state.error = {
          error: "",
          message: "",
          userCode: "",
        };
        state.showSuccessSnackbar = false;
      })
      .addCase(
        processImage.fulfilled,
        (state, action: PayloadAction<DataFromImage>) => {
          state.loading = false;
          state.dataFromImage = action.payload;
          state.showSuccessSnackbar = true;
        }
      )
      .addCase(
        processImage.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultImageUploapError.error,
            message: action.payload?.message || defaultImageUploapError.message,
            userCode: action.payload?.userCode || "",
          };
          state.showSuccessSnackbar = false;
        }
      );
  },
});

export const { setshowSuccessSnackbar, resetImageState } = imageSlice.actions;
export default imageSlice.reducer;
