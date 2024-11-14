import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorResponse,
  LicenseAndTrainings,
  Users,
} from "@/interfaces/interfaces";
import {
  defaultUpdateLicenseAndTrainingsError,
  defaultUpdateUserError,
} from "@/constants/config.enum";
import { fetchUserDetails } from "./UserDetailsSlice"; // Importamos la acción

// Estado inicial para LicenseAndTrainings
const initialState: {
  licenseAndTrainings: LicenseAndTrainings;
  user: Users;
  loading: boolean;
  error: ErrorResponse;
  showSuccessSnackbar: boolean;
  showErrorAlert: boolean;
} = {
  licenseAndTrainings: {
    userCode: "",
    licenseType: "",
    expires: "",

    state: "",
    presented: "",
  },
  user: {
    id: 0,
    recruiterName: "",
    leaderName: "",
    leaderCode: "",
    userName: "",
    position: "",
    recruiterCode: "",
    userCode: "",
    startDate: "",
    birthDate: "",
    phone: "",
    email: "",
    homeAddress: "",
    businessAddress: "",
    spouseName: "",
    recruiter: {} as Users,
    recruits: [],
  },
  loading: false,
  error: { message: "", error: "" },
  showSuccessSnackbar: false,
  showErrorAlert: false,
};

export const saveLicenseAndTrainings = createAsyncThunk<
  { message: string; data: LicenseAndTrainings },
  LicenseAndTrainings, // Tipo de entrada
  { rejectValue: ErrorResponse } // Tipo en caso de error
>(
  "details/saveLicenseAndTrainings",
  async (licenseData: LicenseAndTrainings, { rejectWithValue }) => {
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

      // La respuesta debe ser de la forma { message: string; data: unknown }
      return (await response.json()) as {
        message: string;
        data: LicenseAndTrainings;
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
  name: "licenseAndTrainings",
  initialState,
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetLicenseAndTrainingsState(state) {
      return {
        ...state,
        loading: false,
        error: { message: "", error: "" },
        showSuccessSnackbar: false,
        showErrorAlert: false,
        licenseAndTrainings: initialState.licenseAndTrainings,
      };
    },
  },
  extraReducers: (builder) => {
    builder
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
          state.licenseAndTrainings = action.payload
            .data as LicenseAndTrainings;
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
      // Sincronizando datos del UserDetails Tabs reducer para licenseAndTrainings
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.licenseAndTrainings = {
          ...state.licenseAndTrainings,
          ...action.payload.licenseAndTrainings,
        };
        state.user = {
          ...state.user,
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
