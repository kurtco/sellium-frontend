import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  DetailsState,
  ErrorResponse,
  JobInformation,
  LicenseAndTrainings,
  PersonalInformation,
  Progress,
} from "@/interfaces/interfaces";
import { defaultUpdateUserError } from "@/constants/config.enum";

// Action to get the user details for ALL the tabs
export const fetchUserDetails = createAsyncThunk<
  DetailsState, // Data type when the promise is successfully resolved
  string, // Type of the argument (userCode) that is passed to the function
  { rejectValue: ErrorResponse } // Type to return in case of error
>(
  "userDetails/fetchUserDetails",
  async (userCode: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userCode}/detailtabs`);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      const errorContent: ErrorResponse = {
        statusCode: errorMessage.statusCode || 404,
        error: errorMessage.error || defaultUpdateUserError.error,
        message: errorMessage.message || defaultUpdateUserError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      };
      return rejectWithValue(errorContent);
    }
  }
);
// Estado inicial
const initialState: {
  userDetails: {
    personalInformation: PersonalInformation | null;
    jobInformation: JobInformation | null;
    licenseAndTrainings: LicenseAndTrainings | null;
    progress: Progress | null;
  };
  loading: boolean;
  error: ErrorResponse;
  showErrorAlert: boolean;
} = {
  userDetails: {
    personalInformation: null,
    jobInformation: null,
    licenseAndTrainings: null,
    progress: null,
  },
  loading: false,
  error: {
    error: "",
    message: "",
  },
  showErrorAlert: false,
};

// Slice para manejar el estado de los detalles del usuario
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },

    resetUserDetailsState(state) {
      return {
        ...state,
        loading: false,
        error: { message: "", error: "" },
        showErrorAlert: false,
        userDetails: initialState.userDetails,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showErrorAlert = false;
      })
      .addCase(
        fetchUserDetails.fulfilled,
        (state, action: PayloadAction<DetailsState>) => {
          state.loading = false;
          state.userDetails = {
            personalInformation: action.payload.personalInformation,
            jobInformation: action.payload.jobInformation,
            licenseAndTrainings: action.payload.licenseAndTrainings,
            progress: action.payload.progress,
          };
        }
      )

      .addCase(
        fetchUserDetails.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message: action.payload?.message || defaultUpdateUserError.message,
          };
          state.showErrorAlert = true;
        }
      );
  },
});

export const { setShowErrorAlert, resetUserDetailsState } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
