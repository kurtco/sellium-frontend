import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DetailsState, ErrorResponse, Users } from "@/interfaces/interfaces";
import { defaultUpdateUserError } from "@/constants/config.enum";
import { initialState } from "../userDetails.reducer";

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
    return rejectWithValue({
      statusCode: errorMessage.statusCode || 404,
      error: errorMessage.error || defaultUpdateUserError.error,
      message: errorMessage.message || defaultUpdateUserError.message,
      userCode: errorMessage.userCode || "",
      data: errorMessage.data || null,
    });
  }
});

const userOverviewSlice = createSlice({
  name: "userOverview",
  initialState: initialState.user,
  reducers: {
    setShowErrorAlert(state, action: PayloadAction<boolean>) {
      state.showErrorAlert = action.payload;
    },
    resetUserState(state) {
      state.data = initialState.user.data;
      state.loading = false;
      state.error = { message: "", error: "" };
      state.showSuccessSnackbar = false;
      state.showErrorAlert = false;
      state.isFetched = false;
      state.notFound = false;
    },
    setUser(state, action: PayloadAction<Users>) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOverview.pending, (state) => {
        state.loading = true;
        state.error = { message: "", error: "" };
        state.showErrorAlert = false;
        state.notFound = false;
      })
      .addCase(
        fetchUserOverview.fulfilled,
        (state, action: PayloadAction<DetailsState>) => {
          state.notFound = false;
          state.isFetched = true;
          state.loading = false;
          state.data = {
            ...state.data,
            ...action.payload.user,
          };
        }
      )
      .addCase(
        fetchUserOverview.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message: action.payload?.message || defaultUpdateUserError.message,
          };
          state.showErrorAlert = true;
          state.notFound = action.payload?.statusCode === 404;
        }
      );
  },
});

export const { setShowErrorAlert, resetUserState, setUser } =
  userOverviewSlice.actions;

export default userOverviewSlice.reducer;
