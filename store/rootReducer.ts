// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import userPositionReducer from "./userPositionSlice";
import userDetailsReducer from "./details/userDetail.reducer";

const rootReducer = combineReducers({
  image: imageReducer,
  userPosition: userPositionReducer,
  userDetails: userDetailsReducer,
});

export default rootReducer;
