import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LicenseAndTrainings, ErrorResponse } from "@/interfaces/interfaces";
import {
  defaultUpdateLicenseAndTrainingsError,
  defaultUpdateUserError,
} from "@/constants/config.enum";

import { fetchUserOverview, setUser } from "./userOverviewSlice";
import { initialState } from "../iniitialState";

// Async thunk para guardar 'licenseAndTrainings'
export const saveLicenseAndTrainings = createAsyncThunk<
  { message: string; data: LicenseAndTrainings },
  LicenseAndTrainings,
  { rejectValue: ErrorResponse }
>(
  "saveLicenseAndTrainings",
  async (licenseData: LicenseAndTrainings, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("/api/users/details/licenseAndTrainings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(licenseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();

      // Despachamos la acción para actualizar 'user' cuando los datos de 'user' están disponibles
      if (data.user) {
        dispatch(setUser(data.user)); // Despachamos la acción para actualizar 'user'
      }

      return {
        message: "License and Trainings data saved",
        data: data.licenseAndTrainings,
      };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      const errorContent: ErrorResponse = {
        statusCode: errorMessage.statusCode || 404,
        error: errorMessage.error || defaultUpdateUserError.error,
        message:
          errorMessage.message || defaultUpdateLicenseAndTrainingsError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      };
      return rejectWithValue(errorContent);
    }
  }
);

const licenseAndTrainingsSlice = createSlice({
  name: "licenseAndTrainingsSlice",
  initialState,
  reducers: {
    setShowSuccessSnackbar(
      state,
      action: PayloadAction<{
        section: "licenseAndTrainings";
        value: boolean;
      }>
    ) {
      state.licenseAndTrainings.showSuccessSnackbar = action.payload.value;
    },
    setShowErrorAlert(
      state,
      action: PayloadAction<{ section: "licenseAndTrainings"; value: boolean }>
    ) {
      state.licenseAndTrainings.showErrorAlert = action.payload.value;
    },
    resetLicenseAndTrainingsState(state) {
      state.licenseAndTrainings = {
        ...initialState.licenseAndTrainings,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveLicenseAndTrainings.pending, (state) => {
        state.licenseAndTrainings.loading = true;
        state.licenseAndTrainings.error = { message: "", error: "" };
        state.licenseAndTrainings.showSuccessSnackbar = false;
      })
      .addCase(
        saveLicenseAndTrainings.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; data: LicenseAndTrainings }>
        ) => {
          state.licenseAndTrainings.loading = false;
          state.licenseAndTrainings.data = action.payload.data;
          state.licenseAndTrainings.showSuccessSnackbar = true;
        }
      )
      .addCase(
        saveLicenseAndTrainings.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.licenseAndTrainings.loading = false;
          state.licenseAndTrainings.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message ||
              defaultUpdateLicenseAndTrainingsError.message,
          };
          state.licenseAndTrainings.showSuccessSnackbar = false;
          state.licenseAndTrainings.showErrorAlert = true;
        }
      )
      // Sincronización de datos desde el UserOverviewSlice
      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.licenseAndTrainings.data = {
          ...state.licenseAndTrainings.data,
          ...action.payload.licenseAndTrainings,
        };
        state.user.data = {
          ...state.user.data,
          ...action.payload.user,
        };
      });
  },
});

// Exportamos las acciones y el reducer
export const {
  setShowSuccessSnackbar,
  setShowErrorAlert,
  resetLicenseAndTrainingsState,
} = licenseAndTrainingsSlice.actions;

export default licenseAndTrainingsSlice.reducer;
