import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LicenseAndTrainings, ErrorResponse } from "@/interfaces/interfaces";
import {
  defaultUpdateLicenseAndTrainingsError,
  defaultUpdateUserError,
  saveUserSuccessMessage,
} from "@/constants/config.enum";
import { initialState } from "../userDetails.reducer";
import { fetchUserOverview, setUser } from "./userOverviewSlice";

// Async thunk para guardar `licenseAndTrainings`
export const saveLicenseAndTrainings = createAsyncThunk<
  { message: string; data: LicenseAndTrainings },
  LicenseAndTrainings,
  { rejectValue: ErrorResponse }
>(
  "details/saveLicenseAndTrainings",
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

      if (data.user) {
        dispatch(setUser(data.user));
      }

      return {
        message: saveUserSuccessMessage.licenseInformation,
        data: data.licenseAndTrainings,
      };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue({
        statusCode: errorMessage.statusCode || 404,
        error: errorMessage.error || defaultUpdateUserError.error,
        message:
          errorMessage.message || defaultUpdateLicenseAndTrainingsError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      });
    }
  }
);

const licenseAndTrainingsSlice = createSlice({
  name: "licenseAndTrainings",
  initialState: initialState.licenseAndTrainings,
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetLicenseAndTrainingsState(state) {
      state.data = initialState.licenseAndTrainings.data;
      state.loading = false;
      state.error = { message: "", error: "" };
      state.showSuccessSnackbar = false;
      state.showErrorAlert = false;
      state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Mientras se guarda `licenseAndTrainings`
      .addCase(saveLicenseAndTrainings.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showSuccessSnackbar = false;
      })
      .addCase(
        saveLicenseAndTrainings.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; data: LicenseAndTrainings }>
        ) => {
          state.loading = false;
          state.data = action.payload.data;
          state.showSuccessSnackbar = true;
        }
      )
      .addCase(
        saveLicenseAndTrainings.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message ||
              defaultUpdateLicenseAndTrainingsError.message,
          };
          state.showSuccessSnackbar = false;
          state.showErrorAlert = true;
        }
      )

      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload.licenseAndTrainings,
        };
        state.isFetched = true;
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
