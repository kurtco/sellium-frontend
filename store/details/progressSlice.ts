import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse, Progress, Users } from "@/interfaces/interfaces";
import {
  defaultUpdateProgressError,
  defaultUpdateUserError,
} from "@/constants/config.enum";
import { fetchUserDetails } from "./UserDetailsSlice"; // Importamos la acción

// Initial state for Progress data
const initialState: {
  progress: Progress;
  user: Users;
  loading: boolean;
  error: ErrorResponse;
  showSuccessSnackbar: boolean;
  showErrorAlert: boolean;
} = {
  progress: {
    userCode: "",
    year: new Date().getFullYear(),
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

// Action to save or update Progress data
export const saveProgress = createAsyncThunk<
  Progress, // Response type
  Progress, // Parameters type
  { rejectValue: ErrorResponse } // Error type
>(
  "details/saveProgress",
  async (progressData: Progress, { rejectWithValue }) => {
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

      return (await response.json()) as Progress;
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
  name: "progress",
  initialState,
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetProgressState(state) {
      return {
        ...state,
        loading: false,
        error: { message: "", error: "" },
        showSuccessSnackbar: false,
        showErrorAlert: false,
        progress: initialState.progress,
      };
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
        (state, action: PayloadAction<Progress>) => {
          state.loading = false;
          state.progress = action.payload;
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
      // Synchronizing data from UserDetails Tabs reducer for Progress
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.progress = {
          ...state.progress,
          ...action.payload.progress,
        };
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      });
  },
});

// Export actions and reducer
export const { setShowSuccessSnackbar, setShowErrorAlert, resetProgressState } =
  progressSlice.actions;

export default progressSlice.reducer;
