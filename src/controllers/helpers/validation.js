import validator from "validator";
import { badRequest } from "./index.js";

export const checkIfIdValid = (id) => validator.isUUID(id);

export const invalidIdResponse = () =>
  badRequest({
    errorMessage: "The provided id is not valid",
  });

export const requiredFieldsMissingResponse = (field) => {
  return badRequest({
    errorMessage: `The field ${field} is required`,
  });
};

export const checkIfIsString = (value) => typeof value === "string";

export const validateRequiredField = (params, requiredFields) => {
  for (const field of requiredFields) {
    const fieldIsMissing = !params[field];

    const fieldIsEmpty =
      checkIfIsString(params[field]) &&
      validator.isEmpty(params[field], {
        ignore_whitespace: true,
      });

    if (fieldIsMissing || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      };
    }
  }

  return {
    ok: true,
    missingField: undefined,
  };
};
