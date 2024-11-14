import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, Users } from "@/interfaces/interfaces";
import { defaultUpdateUserError } from "@/constants/config.enum";
import { RepresentativeTypeLabels } from "@/constants/labels.enums";

export const updateUserPosition = createAsyncThunk<
  Users, // Tipo de datos cuando la promesa se resuelve correctamente
  { userCode: string; representative: RepresentativeTypeLabels }, // Argumentos que se pasan a la función
  { rejectValue: ErrorResponse } // Tipo del valor rechazado
>(
  "user/updatePosition",
  async ({ userCode, representative }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userCode}/position`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ representative }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        return rejectWithValue(errorData); // Devolver el error usando rejectWithValue
      }

      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      const errorMessage = error as ErrorResponse;
      const errorContent: ErrorResponse = {
        error: errorMessage.error || defaultUpdateUserError.error,
        message:
          error instanceof Error
            ? error.message
            : defaultUpdateUserError.message,
      };
      return rejectWithValue(errorContent);
    }
  }
);

// Estado inicial para el manejo de la posición del usuario
interface UserPositionState {
  loading: boolean;
  updatedUser: Users | null;
  error: ErrorResponse;
}

const initialState: UserPositionState = {
  loading: false,
  updatedUser: null,
  error: {
    error: "",
    message: "",
  },
};

const userPositionSlice = createSlice({
  name: "userPosition",
  initialState,
  reducers: {
    resetUserPositionState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserPosition.pending, (state) => {
        state.loading = true;
        state.error = {
          error: "",
          message: "",
        };
      })
      .addCase(
        updateUserPosition.fulfilled,
        (state, action: PayloadAction<Users>) => {
          state.loading = false;
          state.updatedUser = action.payload;
        }
      )
      .addCase(
        updateUserPosition.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = {
            error: action.payload?.error || defaultUpdateUserError.error,
            message: action.payload?.message || defaultUpdateUserError.message,
          };
        }
      );
  },
});

export const { resetUserPositionState } = userPositionSlice.actions;
export default userPositionSlice.reducer;
