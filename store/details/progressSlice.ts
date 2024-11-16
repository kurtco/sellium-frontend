import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Progress, ErrorResponse } from "@/interfaces/interfaces";
import {
  defaultUpdateProgressError,
  defaultUpdateUserError,
} from "@/constants/config.enum";
import { initialState } from "../userDetails.reducer";
import { fetchUserOverview, setUser } from "./userOverviewSlice";

// Async thunk para guardar `progress`
export const saveProgress = createAsyncThunk<
  { message: string; data: Progress },
  Progress,
  { rejectValue: ErrorResponse }
>(
  "userDetails/saveProgress",
  async (progressData: Progress, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("/api/users/details/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();

      // Si la respuesta contiene datos de 'user', actualizamos 'user' utilizando la acción setUser
      if (data.user) {
        dispatch(setUser(data.user)); // Despachamos la acción para actualizar 'user'
      }

      return { message: "Progress data saved", data: data.progress };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      const errorContent: ErrorResponse = {
        statusCode: errorMessage.statusCode || 404,
        error: errorMessage.error || defaultUpdateUserError.error,
        message: errorMessage.message || defaultUpdateProgressError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      };
      return rejectWithValue(errorContent);
    }
  }
);

const progressSlice = createSlice({
  name: "progressSlice",
  initialState,
  reducers: {
    setShowSuccessSnackbar(
      state,
      action: PayloadAction<{ section: "progress"; value: boolean }>
    ) {
      state.progress.showSuccessSnackbar = action.payload.value;
    },
    setShowErrorAlert(
      state,
      action: PayloadAction<{ section: "progress"; value: boolean }>
    ) {
      state.progress.showErrorAlert = action.payload.value;
    },
    resetProgressState(state) {
      state.progress = {
        ...initialState.progress,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveProgress.pending, (state) => {
        state.progress.loading = true;
        state.progress.error = { message: "", error: "" };
        state.progress.showSuccessSnackbar = false;
      })
      .addCase(
        saveProgress.fulfilled,
        (state, action: PayloadAction<{ message: string; data: Progress }>) => {
          state.progress.loading = false;
          state.progress.data = action.payload.data;
          state.progress.showSuccessSnackbar = true;
        }
      )
      .addCase(
        saveProgress.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.progress.loading = false;
          state.progress.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message || defaultUpdateProgressError.message,
          };
          state.progress.showSuccessSnackbar = false;
          state.progress.showErrorAlert = true;
        }
      )
      // Sincronización de datos desde el UserOverviewSlice
      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.progress.data = {
          ...state.progress.data,
          ...action.payload.progress,
        };
      });
  },
});

// Exportar acciones y reducer
export const { setShowSuccessSnackbar, setShowErrorAlert, resetProgressState } =
  progressSlice.actions;

export default progressSlice.reducer;
