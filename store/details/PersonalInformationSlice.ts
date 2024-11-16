import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ErrorResponse,
  PersonalInformation,
  Users,
} from "@/interfaces/interfaces";
import {
  defaultUpdatePersonalInformationError,
  defaultUpdateUserError,
  saveUserSuccessMessage,
} from "@/constants/config.enum";
import { initialState } from "../iniitialState";
import { fetchUserOverview, setUser } from "./userOverviewSlice";

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
      const response = await fetch("/api/users/details/personalInformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personalInfo),
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
        message: saveUserSuccessMessage.personalInformation,
        data: {
          personalInformation: data.personalInformation,
          user: data.user,
        },
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

// Slice para manejar el estado de `personalInformation`
const personalInformationSlice = createSlice({
  name: "personalInformation",
  initialState: initialState.personalInformation, // Usamos solo la porción específica del estado inicial
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetPersonalInformationState(state) {
      state.data = initialState.personalInformation.data;
      state.loading = false;
      state.error = { message: "", error: "" };
      state.showSuccessSnackbar = false;
      state.showErrorAlert = false;
      state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Mientras se guarda la información personal
      .addCase(savePersonalInformation.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showSuccessSnackbar = false;
      })
      // Cuando se guarda con éxito
      .addCase(
        savePersonalInformation.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            data: { personalInformation: PersonalInformation; user: Users };
          }>
        ) => {
          state.loading = false;
          state.data = action.payload.data.personalInformation;
          state.showSuccessSnackbar = true;
        }
      )
      // Cuando falla al guardar
      .addCase(
        savePersonalInformation.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message ||
              defaultUpdatePersonalInformationError.message,
          };
          state.showSuccessSnackbar = false;
          state.showErrorAlert = true;
        }
      )
      // Sincronizar con `fetchUserOverview`
      .addCase(fetchUserOverview.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          ...action.payload.personalInformation,
        };
        state.isFetched = true; // Marcamos que los datos han sido obtenidos
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
