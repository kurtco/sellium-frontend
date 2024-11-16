import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DetailsState, ErrorResponse, Users } from "@/interfaces/interfaces";
import { defaultUpdateUserError } from "@/constants/config.enum";
import { initialState } from "../userDetails.reducer";

// Async thunk para obtener los detalles del usuario
export const fetchUserOverview = createAsyncThunk<
  DetailsState,
  string,
  { rejectValue: ErrorResponse }
>("details/fetchUserDetails", async (userCode: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/users/${userCode}/detailtabs`);
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const data = await response.json();
    return data;
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
});

const userOverviewSlice = createSlice({
  name: "userOverviewSlice",
  initialState,
  reducers: {
    setShowErrorAlert(
      state,
      action: PayloadAction<{
        section: keyof typeof initialState;
        value: boolean;
      }>
    ) {
      state[action.payload.section].showErrorAlert = action.payload.value;
    },
    resetIsFetched(
      state,
      action: PayloadAction<{
        section: keyof typeof initialState;
        value: boolean;
      }>
    ) {
      state[action.payload.section].isFetched = action.payload.value;
    },
    resetUserDetailsState() {
      return initialState;
    },
    setUser(state, action: PayloadAction<Users>) {
      // Actualizamos la sección de `user` en el estado
      state.user.data = {
        ...state.user.data,
        ...action.payload, // Actualizamos solo las propiedades nuevas
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOverview.pending, (state) => {
        state.user.loading = true;
        state.user.error = { message: "", error: "" };
        state.user.showErrorAlert = false;
        state.user.notFound = false;
      })
      .addCase(
        fetchUserOverview.fulfilled,
        (state, action: PayloadAction<DetailsState>) => {
          state.user.notFound = false;
          state.user.isFetched = true;
          state.user.loading = false;

          // Actualizamos las secciones específicas
          state.personalInformation.data = action.payload.personalInformation;
          state.jobInformation.data = action.payload.jobInformation;
          state.licenseAndTrainings.data = action.payload.licenseAndTrainings;
          state.progress.data = action.payload.progress;

          // Actualizamos directamente `user` usando `setUser`
          state.user.data = {
            ...state.user.data,
            ...action.payload.user,
          };
        }
      )
      .addCase(
        fetchUserOverview.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.user.loading = false;
          state.user.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message: action.payload?.message || defaultUpdateUserError.message,
          };
          state.user.showErrorAlert = true;
          state.user.notFound = action.payload?.statusCode === 404;
        }
      );
  },
});

// Exportar acciones y reducer
export const {
  setShowErrorAlert,
  resetUserDetailsState,
  resetIsFetched,
  setUser,
} = userOverviewSlice.actions;

export default userOverviewSlice.reducer;
