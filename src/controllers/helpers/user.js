import validator from "validator";
import { badRequest, notFound } from "./http.js";

export const invalidPasswordResponse = () =>
  badRequest({
    errorMessage: "Password must be at least 6 characters",
  });

export const emailIsAlreadyInUseResponse = () =>
  badRequest({
    errorMessage: "Invalid e-mail. Please provide a valid one!",
  });

export const userNotFoundResponse = () =>
  notFound({
    errorMessage: "User not found",
  });

export const checkPasswordIfValid = (password) => password.length >= 6;

export const checkIfEmailValid = (email) => validator.isEmail(email);
