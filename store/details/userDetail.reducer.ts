// userDetailsSlice.ts
import { combineReducers } from "@reduxjs/toolkit";
import personalInformationReducer from "./personalInformationSlice";
import jobInformationReducer from "./jobInformationSlice";
import licenseAndTrainingsReducer from "./licenseAndTrainingsSlice";
import progressReducer from "./progressSlice";
import userOverviewReducer from "./userOverviewSlice";

// Combinas todos los reducers de los slices en un solo reducer
const userDetailsSlice = combineReducers({
  personalInformation: personalInformationReducer,
  jobInformation: jobInformationReducer,
  licenseAndTrainings: licenseAndTrainingsReducer,
  progress: progressReducer,
  userOverview: userOverviewReducer,
});

export default userDetailsSlice;
