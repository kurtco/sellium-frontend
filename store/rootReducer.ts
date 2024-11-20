import { combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageSlice";
import userPositionReducer from "./userPositionSlice";
import PersonalInformationReducer from "./details/PersonalInformationSlice";
import JobInformationReducer from "./details/JobInformationSlice";
import UserDetailsTabsReducer from "./details/UserDetailsSlice";
import LicenseAndTrainingReducer from "./details/LicenseAndTrainingsSlice";
import ProgressReducer from "./details/progressSlice";
import pdfReducer from "./pdfSlice";

// Combina todos los reducers en un solo rootReducer
const rootReducer = combineReducers({
  image: imageReducer,
  pdf: pdfReducer,
  userPosition: userPositionReducer,
  personalInformation: PersonalInformationReducer,
  jobInformation: JobInformationReducer,
  userDetailsTabs: UserDetailsTabsReducer,
  licenseAndTraining: LicenseAndTrainingReducer,
  progress: ProgressReducer,
});

export default rootReducer;
