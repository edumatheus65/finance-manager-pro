import validator from "validator";
import { badRequest } from "./index.js";

export const checkIfAmountIsValid = (amount) =>
  validator.isCurrency(amount.toString(), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: ".",
  });

export const checkIfTypeIsValid = (type) =>
  ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);

export const invalidAmountResponse = () => {
  return badRequest({ message: "The amount must be a valid currency" });
};

export const invalidTypeResponse = () => {
  return badRequest({
    message: "The type must be EARNING, EXPENSE, INVESTMENT",
  });
};
