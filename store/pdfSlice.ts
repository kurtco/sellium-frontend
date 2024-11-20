/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, pdfExtractedData } from "@/interfaces/interfaces";
import {
  defaultPdfUploapError,
  OcrServiceStatus,
} from "@/constants/config.enum";

// Estado inicial de los datos extraídos
interface PdfState {
  loading: boolean;
  base64: string | null;
  extractedData: pdfExtractedData | null;
  error: ErrorResponse;
  showSuccessSnackbar: boolean;
  showErrorAlert?: boolean;
}

// Estado inicial
const initialState: PdfState = {
  loading: false,
  base64: null,
  extractedData: null,
  error: {
    error: "",
    message: "",
    userCode: "",
    data: null,
  },
  showSuccessSnackbar: false,
  showErrorAlert: false,
};
export const processPdf = createAsyncThunk<
  pdfExtractedData,
  File,
  { rejectValue: ErrorResponse }
>("pdf/processPdf", async (file: File, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const base64Response = await fetch("/api/base64", {
      method: "POST",
      body: formData,
    });

    if (!base64Response.ok) {
      throw new Error(defaultPdfUploapError.message);
    }

    const { base64 } = await base64Response.json();

    // Procesar el PDF en Base64
    const processResponse = await fetch("/api/ocr/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pdfBase64: base64 }),
    });

    if (!processResponse.ok) {
      const errorData: ErrorResponse = await processResponse.json();
      return rejectWithValue(errorData);
    }

    const processedData = await processResponse.json();
    return processedData;
  } catch (error) {
    const errorMessage = error as ErrorResponse;

    const errorContent: ErrorResponse = {
      statusCode: errorMessage.statusCode || 500,
      error: errorMessage.error || defaultPdfUploapError.error,
      message: errorMessage.message || defaultPdfUploapError.message,
      data: errorMessage.data || null,
    };

    return rejectWithValue(errorContent);
  }
});

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetPdfState: (state) => {
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

      .addCase(processPdf.pending, (state) => {
        state.loading = true;
        state.error = {
          error: "",
          message: "",
          userCode: "",
        };
        state.showSuccessSnackbar = false;
      })
      .addCase(
        processPdf.fulfilled,
        (state, action: PayloadAction<pdfExtractedData>) => {
          state.loading = false;
          state.extractedData = action.payload;
          state.showSuccessSnackbar = true;
        }
      )
      .addCase(
        processPdf.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultPdfUploapError.error,
            message: action.payload?.message || defaultPdfUploapError.message,
            userCode: action.payload?.userCode || "",
          };
          state.showErrorAlert = true;
        }
      );
  },
});

export const { setShowSuccessSnackbar, resetPdfState, setShowErrorAlert } =
  pdfSlice.actions;
export default pdfSlice.reducer;
