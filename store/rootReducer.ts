import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import userPositionReducer from "./userPositionSlice";

// Combina todos los reducers en un solo rootReducer
const rootReducer = combineReducers({
  image: imageReducer,
  userPosition: userPositionReducer,
});

export default rootReducer;
