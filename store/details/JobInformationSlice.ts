import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorResponse,
  JobInformation,
  Recruiter,
  Users,
} from "@/interfaces/interfaces";
import {
  defaultUpdateJobInformationError,
  defaultUpdateUserError,
} from "@/constants/config.enum";
import { fetchUserDetails } from "./UserDetailsSlice"; // Importamos la acción

// initial state of job info. data
const initialState: {
  jobInformation: JobInformation;
  user: Users;
  loading: boolean;
  error: ErrorResponse;
  showSuccessSnackbar: boolean;
  showErrorAlert: boolean;
} = {
  jobInformation: {
    userCode: "",
    position: "",
    promotionDate: "",
    personalCode: "",
    partOfCompanySince: "",
    appointed: "",
    eo: null,
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
    recruiter: {} as Recruiter,
    recruits: [],
  },
  loading: false,
  error: { message: "", error: "" },
  showSuccessSnackbar: false,
  showErrorAlert: false,
};

export const saveJobInformation = createAsyncThunk<
  JobInformation, // response type
  JobInformation, // paramerts type
  { rejectValue: ErrorResponse } // error case type
>(
  "details/saveJobInformation",
  async (jobInfo: JobInformation, { rejectWithValue }) => {
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

      return (await response.json()) as JobInformation;
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

const jobInformationSlice = createSlice({
  name: "jobInformation",
  initialState,
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetJobInformationState(state) {
      return {
        ...state,
        loading: false,
        error: { message: "", error: "" },
        showSuccessSnackbar: false,
        showErrorAlert: false,
        jobInformation: initialState.jobInformation,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJobInformation.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showSuccessSnackbar = false;
      })
      .addCase(
        saveJobInformation.fulfilled,
        (state, action: PayloadAction<JobInformation>) => {
          state.loading = false;
          state.jobInformation = action.payload;
          state.showSuccessSnackbar = true;
        }
      )
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
      //Synchronizing data from UserDetails Tabs reducer for job Information
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.jobInformation = {
          ...state.jobInformation,
          ...action.payload.jobInformation,
        };
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      });
  },
});

// export the actions and the reducer
export const {
  setShowSuccessSnackbar,
  setShowErrorAlert,
  resetJobInformationState,
} = jobInformationSlice.actions;

export default jobInformationSlice.reducer;
