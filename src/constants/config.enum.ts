export enum ThemeMode {
  DARK = "dark",
  LIGHT = "light",
}

export enum TableView {
  GRID = "Grid",
  TREE = "Tree",
}

export enum AgentsPositions {
  Student = "Representative Student",
  Licensed = "Representative Licensed",
}

export enum OcrServiceResponses {
  BadImage = "The uploaded image does not meet the required format.",
  Conflict = "User already exists",
  UserRepresentiveType = "Choose your representative type to continue",
}

export enum OcrServiceStatus {
  BadImage = "Bad Image",
  Conflict = "User Conflict",
  UserRepresentiveType = "Represetative",
  Default = "Failed to process image",
}

export enum defaultImageUploapError {
  message = "There was a issue processing the image, please try again!",
  error = "Internal Server Error",
}

export enum defaultUpdateUserError {
  message = "There was a issue updating the user, please try again!",
  error = "Internal Server Error",
}

export enum defaultUpdateJobInformationError {
  message = "There was a issue updating the job information details, please try again!",
  error = "Internal Server Error",
}

export enum defaultUpdateLicenseAndTrainingsError {
  message = "There was a issue updating the license and Training details, please try again!",
  error = "Internal Server Error",
}

export enum defaultUpdateProgressError {
  message = "There was a issue updating the progress details, please try again!",
  error = "Internal Server Error",
}
