import validator from "validator";
import { badRequest } from "./http.js";

export const invalidPasswordResponse = () =>
  badRequest({
    errorMessage: "Password must be at least 6 characters",
  });

export const emailIsAlreadyInUseResponse = () =>
  badRequest({
    errorMessage: "Invalid e-mail. Please provide a valid one!",
  });

export const invalidIdResponse = () =>
  badRequest({
    errorMessage: "The provided id is not valid",
  });

export const checkPasswordIfValid = (password) => password.length >= 6;

export const checkIfEmailValid = (email) => validator.isEmail(email);

export const checkIfIdValid = (id) => validator.isUUID(id);
