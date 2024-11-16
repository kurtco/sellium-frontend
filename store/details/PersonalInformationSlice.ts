import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorResponse,
  PersonalInformation,
  Users,
} from "@/interfaces/interfaces";
import {
  defaultUpdatePersonalInformationError,
  defaultUpdateUserError,
} from "@/constants/config.enum";
import { initialState } from "../iniitialState";
import { fetchUserOverview, setUser } from "./userOverviewSlice";

// Acción asíncrona para guardar información personal

// Async thunk para guardar `personalInformation`
export const savePersonalInformation = createAsyncThunk<
  {
    message: string;
    data: { personalInformation: PersonalInformation; user: Users };
  },
  PersonalInformation,
  { rejectValue: ErrorResponse }
>(
  "details/savePersonalInformation",
  async (personalInfo: PersonalInformation, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("/api/users/details/PersonalInformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personalInfo),
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
        data: { personalInformation: PersonalInformation; user: Users };
      };
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      return rejectWithValue({
        statusCode: errorMessage.statusCode || 404,
        error:
          errorMessage.error || defaultUpdatePersonalInformationError.error,
        message:
          errorMessage.message || defaultUpdatePersonalInformationError.message,
        userCode: errorMessage.userCode || "",
        data: errorMessage.data || null,
      });
    }
  }
);

const personalInformationSlice = createSlice({
  name: "personalInformationSlice",
  initialState,
  reducers: {
    setShowSuccessSnackbar(
      state,
      action: PayloadAction<{ section: "personalInformation"; value: boolean }>
    ) {
      state.personalInformation.showSuccessSnackbar = action.payload.value;
    },
    setShowErrorAlert(
      state,
      action: PayloadAction<{ section: "personalInformation"; value: boolean }>
    ) {
      state.personalInformation.showErrorAlert = action.payload.value;
    },
    resetPersonalInformationState(state) {
      state.personalInformation = {
        ...initialState.personalInformation,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(savePersonalInformation.pending, (state) => {
        state.personalInformation.loading = true;
        state.personalInformation.error = { message: "", error: "" };
        state.personalInformation.showSuccessSnackbar = false;
      })
      .addCase(
        savePersonalInformation.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            data: { personalInformation: PersonalInformation; user: Users };
          }>
        ) => {
          state.personalInformation.loading = false;
          state.personalInformation.data =
            action.payload.data.personalInformation;
          state.personalInformation.showSuccessSnackbar = true;
        }
      )
      .addCase(
        savePersonalInformation.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.personalInformation.loading = false;
          state.personalInformation.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message ||
              defaultUpdatePersonalInformationError.message,
          };
          state.personalInformation.showSuccessSnackbar = false;
          state.personalInformation.showErrorAlert = true;
        }
      )
      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.personalInformation.data = {
          ...state.personalInformation.data,
          ...action.payload.personalInformation,
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
  resetPersonalInformationState,
} = personalInformationSlice.actions;

export default personalInformationSlice.reducer;
