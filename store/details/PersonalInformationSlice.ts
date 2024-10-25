import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse, PersonalInformation } from "@/interfaces/interfaces";
import { defaultUpdateUserError } from "@/constants/config.enum";
import { fetchUserDetails } from "./UserDetailsSlice"; // Importamos la acción

// Estado inicial
const initialState: {
  personalInformation: PersonalInformation;
  loading: boolean;
  error: ErrorResponse;
  showSuccessSnackbar: boolean;
  showErrorAlert: boolean;
} = {
  personalInformation: {
    userCode: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    insured: "",
    productType: "",
    phoneCode: "",
    phoneNumber: "",
    email: "",
    homeAddress: "",
    businessAddress: "",
    spouseName: "",
  },
  loading: false,
  error: { message: "", error: "" },
  showSuccessSnackbar: false,
  showErrorAlert: false,
};

// Acción para guardar la información personal
export const savePersonalInformation = createAsyncThunk<
  PersonalInformation,
  PersonalInformation,
  { rejectValue: ErrorResponse }
>(
  "details/savePersonalInformation",
  async (personalInfo: PersonalInformation, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/users/details/jobInformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personalInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return (await response.json()) as PersonalInformation;
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

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetPersonalInformationState(state) {
      return {
        ...state,
        loading: false,
        error: { message: "", error: "" },
        showSuccessSnackbar: false,
        showErrorAlert: false,
        personalInformation: initialState.personalInformation,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Guardar información personal
      .addCase(savePersonalInformation.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showSuccessSnackbar = false;
      })
      .addCase(
        savePersonalInformation.fulfilled,
        (state, action: PayloadAction<PersonalInformation>) => {
          state.loading = false;
          state.personalInformation = action.payload;
          state.showSuccessSnackbar = true;
        }
      )
      .addCase(
        savePersonalInformation.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message:
              action.payload?.message ||
              "Error al guardar la información personal",
          };
          state.showSuccessSnackbar = false;
          state.showErrorAlert = true;
        }
      )
      // Sincronizing data  from the UserDetailsTabs reducer  to set here the particular data for personalin formation
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.personalInformation = {
          ...state.personalInformation, // Mantén cualquier estado que ya haya sido modificado
          ...action.payload.personalInformation, // Actualiza con los datos traídos del servidor
        };
      });
  },
});

// Exportamos las acciones y el reducer
export const {
  setShowSuccessSnackbar,
  setShowErrorAlert,
  resetPersonalInformationState,
} = detailsSlice.actions;

export default detailsSlice.reducer;
