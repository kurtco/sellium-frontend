import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { JobInformation, Users, ErrorResponse } from "@/interfaces/interfaces";
import {
  defaultUpdateJobInformationError,
  defaultUpdateUserError,
  saveUserSuccessMessage,
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

      if (data.data?.user) {
        const userData: Users = data.data.user;
        dispatch(setUser(userData));
      }

      return {
        message: saveUserSuccessMessage.jobInformation, // Usar el mensaje del enum
        data: { jobInformation: data.jobInformation, user: data.user },
      };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue({
        statusCode: errorMessage.statusCode || 404,
        error: errorMessage.error || defaultUpdateJobInformationError.error,
        message:
          errorMessage.message || defaultUpdateJobInformationError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      });
    }
  }
);

// Slice para manejar el estado de `jobInformation`
const jobInformationSlice = createSlice({
  name: "jobInformation",
  initialState: initialState.jobInformation, // Usamos solo la parte correspondiente del estado inicial
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetJobInformationState(state) {
      state.data = initialState.jobInformation.data;
      state.loading = false;
      state.error = { message: "", error: "" };
      state.showSuccessSnackbar = false;
      state.showErrorAlert = false;
      state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Mientras se guarda la información laboral
      .addCase(saveJobInformation.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showSuccessSnackbar = false;
      })
      // Cuando se guarda con éxito
      .addCase(
        saveJobInformation.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            data: { jobInformation: JobInformation; user: Users };
          }>
        ) => {
          state.loading = false;
          state.data = action.payload.data.jobInformation;
          state.showSuccessSnackbar = true;
        }
      )
      // Cuando falla al guardar
      .addCase(
        saveJobInformation.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message ||
              defaultUpdateJobInformationError.message,
          };
          state.showSuccessSnackbar = false;
          state.showErrorAlert = true;
        }
      )
      // Sincronizar con `fetchUserOverview`
      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload.jobInformation,
        };
        state.isFetched = true;
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
