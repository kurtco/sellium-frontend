import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import userPositionReducer from "./userPositionSlice";
import PersonalInformationReducer from "./details/PersonalInformationSlice";
import JobInformationReducer from "./details/JobInformationSlice";
import UserDetailsTabsReducer from "./details/UserDetailsSlice";
import LicenseAndTrainingReducer from "./details/LicenseAndTrainingsSlice";

// Combina todos los reducers en un solo rootReducer
const rootReducer = combineReducers({
  image: imageReducer,
  userPosition: userPositionReducer,
  personalInformation: PersonalInformationReducer,
  jobInformation: JobInformationReducer,
  userDetailsTabs: UserDetailsTabsReducer,
  licenseAndTraining: LicenseAndTrainingReducer,
});

export default rootReducer;
