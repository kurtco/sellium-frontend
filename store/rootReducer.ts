import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";

export const rootReducer = combineReducers({
  image: imageReducer,
});
