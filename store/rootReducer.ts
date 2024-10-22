import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import userPositionReducer from "./userPositionSlice";
import PersonalInformationSlice from "./details/PersonalInformationSlice";

// Combina todos los reducers en un solo rootReducer
const rootReducer = combineReducers({
  image: imageReducer,
  userPosition: userPositionReducer,
  personalInformation: PersonalInformationSlice,
});

export default rootReducer;
