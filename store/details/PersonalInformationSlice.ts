import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorResponse, PersonalInformation } from "@/interfaces/interfaces";
import { defaultUpdateUserError } from "@/constants/config.enum";

// Initila State
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

export const savePersonalInformation = createAsyncThunk<
  PersonalInformation, // Tipo de datos cuando la promesa se resuelve correctamente
  PersonalInformation, // Tipo del argumento (archivo) que se pasa a la función
  { rejectValue: ErrorResponse } // Aquí definimos el tipo que devolveremos en caso de error
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
    // Mostrar the success snackbar
    setShowSuccessSnackbar(state, action: PayloadAction<boolean>) {
      state.showSuccessSnackbar = action.payload;
    },
    // show the alert error message
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    // Reset the state of personalInformation
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
      // Case pending when the api request is pending or waiting
      .addCase(savePersonalInformation.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showSuccessSnackbar = false;
      })
      // Case fulfilled when the data was saved successfully
      .addCase(
        savePersonalInformation.fulfilled,
        (state, action: PayloadAction<PersonalInformation>) => {
          state.loading = false;
          state.personalInformation = action.payload;
          state.showSuccessSnackbar = true;
        }
      )
      // Case fulfilled when there was a error
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
      );
  },
});

export const {
  setShowSuccessSnackbar,
  setShowErrorAlert,
  resetPersonalInformationState,
} = detailsSlice.actions;

export default detailsSlice.reducer;
