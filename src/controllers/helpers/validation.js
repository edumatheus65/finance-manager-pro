export const checkIfIdValid = (id) => validator.isUUID(id);

export const invalidIdResponse = () =>
  badRequest({
    errorMessage: "The provided id is not valid",
  });
