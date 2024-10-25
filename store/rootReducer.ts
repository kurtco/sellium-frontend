import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import userPositionReducer from "./userPositionSlice";
import PersonalInformationReducer from "./details/PersonalInformationSlice";
import UserDetailsTabsReducer from "./details/UserDetailsSlice";

// Combina todos los reducers en un solo rootReducer
const rootReducer = combineReducers({
  image: imageReducer,
  userPosition: userPositionReducer,
  personalInformation: PersonalInformationReducer,
  UserDetailsTabs: UserDetailsTabsReducer,
});

export default rootReducer;
