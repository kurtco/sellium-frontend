import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { JobInformation, Users, ErrorResponse } from "@/interfaces/interfaces";

import {
  defaultUpdateJobInformationError,
  defaultUpdateUserError,
} from "@/constants/config.enum";
import { initialState } from "../userDetails.reducer";
import { fetchUserOverview, setUser } from "./userOverviewSlice";

// Async thunk para guardar `jobInformation`
export const saveJobInformation = createAsyncThunk<
  { message: string; data: { jobInformation: JobInformation; user: Users } },
  JobInformation,
  { rejectValue: ErrorResponse }
>(
  "details/saveJobInformation",
  async (jobInfo: JobInformation, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("/api/users/details/jobInformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();

      if (data.user) {
        dispatch(setUser(data.user));
      }

      return (await response.json()) as {
        message: string;
        data: { jobInformation: JobInformation; user: Users };
      };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue({
        statusCode: errorMessage.statusCode || 404,
        error: errorMessage.error || defaultUpdateUserError.error,
        message:
          errorMessage.message || defaultUpdateJobInformationError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      });
    }
  }
);

const jobInformationSlice = createSlice({
  name: "jobInformationSlice",
  initialState,
  reducers: {
    setShowSuccessSnackbar(
      state,
      action: PayloadAction<{ section: "jobInformation"; value: boolean }>
    ) {
      state.jobInformation.showSuccessSnackbar = action.payload.value;
    },
    setShowErrorAlert(
      state,
      action: PayloadAction<{ section: "jobInformation"; value: boolean }>
    ) {
      state.jobInformation.showErrorAlert = action.payload.value;
    },
    resetJobInformationState(state) {
      state.jobInformation = {
        ...initialState.jobInformation,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJobInformation.pending, (state) => {
        state.jobInformation.loading = true;
        state.jobInformation.error = { message: "", error: "" };
        state.jobInformation.showSuccessSnackbar = false;
      })
      .addCase(
        saveJobInformation.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            data: { jobInformation: JobInformation; user: Users };
          }>
        ) => {
          state.jobInformation.loading = false;
          state.jobInformation.data = action.payload.data.jobInformation;
          state.user.data.position = action.payload.data.user.position;
          state.jobInformation.showSuccessSnackbar = true;
        }
      )
      .addCase(
        saveJobInformation.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.jobInformation.loading = false;
          state.jobInformation.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message ||
              defaultUpdateJobInformationError.message,
          };
          state.jobInformation.showSuccessSnackbar = false;
          state.jobInformation.showErrorAlert = true;
        }
      )
      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.jobInformation.data = {
          ...state.jobInformation.data,
          ...action.payload.jobInformation,
        };
        state.user.data = {
          ...state.user.data,
          ...action.payload.user,
        };
      });
  },
});

// Exportar acciones y reducer
export const {
  setShowSuccessSnackbar,
  setShowErrorAlert,
  resetJobInformationState,
} = jobInformationSlice.actions;

export default jobInformationSlice.reducer;
