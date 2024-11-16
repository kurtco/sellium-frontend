import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Progress, ErrorResponse } from "@/interfaces/interfaces";
import {
  defaultUpdateProgressError,
  defaultUpdateUserError,
  saveUserSuccessMessage,
} from "@/constants/config.enum";
import { initialState } from "../userDetails.reducer";
import { fetchUserOverview, setUser } from "./userOverviewSlice";

// Async thunk para guardar `progress`
export const saveProgress = createAsyncThunk<
  { message: string; data: Progress },
  Progress,
  { rejectValue: ErrorResponse }
>(
  "details/saveProgress",
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

      if (data.user) {
        dispatch(setUser(data.user));
      }

      return {
        message: saveUserSuccessMessage.progress,
        data: data.progress,
      };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue({
        statusCode: errorMessage.statusCode || 404,
        error: errorMessage.error || defaultUpdateUserError.error,
        message: errorMessage.message || defaultUpdateProgressError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      });
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState: initialState.progress,
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetProgressState(state) {
      state.data = initialState.progress.data;
      state.loading = false;
      state.error = { message: "", error: "" };
      state.showSuccessSnackbar = false;
      state.showErrorAlert = false;
      state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(saveProgress.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showSuccessSnackbar = false;
      })

      .addCase(
        saveProgress.fulfilled,
        (state, action: PayloadAction<{ message: string; data: Progress }>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.showSuccessSnackbar = true;
        }
      )

      .addCase(
        saveProgress.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message || defaultUpdateProgressError.message,
          };
          state.showSuccessSnackbar = false;
          state.showErrorAlert = true;
        }
      )

      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload.progress,
        };
        state.isFetched = true;
      });
  },
});

export const { setShowSuccessSnackbar, setShowErrorAlert, resetProgressState } =
  progressSlice.actions;

export default progressSlice.reducer;
