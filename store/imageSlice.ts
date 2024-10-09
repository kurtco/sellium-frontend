import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DataFromImage, ErrorResponse } from "@/interfaces/interfaces";
import {
  defaultImageUploapError,
  OcrServiceStatus,
} from "@/constants/config.enum";

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
    const errorMessage = error as ErrorResponse;
    const errorContent: ErrorResponse = {
      statusCode: errorMessage.statusCode || 404,
      error: errorMessage.error || defaultImageUploapError.error,
      message: errorMessage.message || defaultImageUploapError.message,
      userCode: errorMessage.userCode || "",
      data: errorMessage.data || null,
    };
    return rejectWithValue(errorContent);
  }
});

interface ImageState {
  loading: boolean;
  dataFromImage: DataFromImage | null;
  error: ErrorResponse; // Podemos utilizar el genérico aquí si es necesario: ErrorResponse<T>
  showSuccessSnackbar: boolean;
  showErrorAlert?: boolean;
}

// Inicializamos el estado utilizando el nuevo tipo para error
const initialState: ImageState = {
  loading: false,
  dataFromImage: null,
  error: {
    error: "",
    message: "",
    userCode: "",
    data: null,
  },
  showSuccessSnackbar: false,
  showErrorAlert: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setshowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
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
        showErrorAlert: false,
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
          state.dataFromImage = action.payload?.data as DataFromImage;
          state.showSuccessSnackbar = false;
          state.showErrorAlert =
            String(action.payload?.error) === String(OcrServiceStatus.BadImage);
        }
      );
  },
});

export const { setshowSuccessSnackbar, resetImageState, setShowErrorAlert } =
  imageSlice.actions;
export default imageSlice.reducer;
