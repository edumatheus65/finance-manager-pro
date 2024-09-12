import validator from "validator";
import { badRequest, serverError, successfulRequest } from "./helpers.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { EmailAlreadyInUseError } from "../erros/user.js";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const isIdValid = validator.isUUID(userId);

      if (!isIdValid) {
        return badRequest({
          errorMessage: "The provided ID is not valid",
        });
      }

      const updateUserParams = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldsIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field)
      );

      if (someFieldsIsNotAllowed) {
        return badRequest({
          errorMessage: "Some provided field is not allowed",
        });
      }

      if (updateUserParams.password) {
        const passwordIsNotValid = updateUserParams.password.length < 6;

        if (passwordIsNotValid) {
          return badRequest({
            errorMessage: "Password must be at least 6 characters",
          });
        }
      }

      if (updateUserParams.email) {
        const emailIsValid = validator.isEmail(updateUserParams.email);

        if (!emailIsValid) {
          return badRequest({
            errorMessage: "Invalid e-mail. Please provide a valid one!",
          });
        }
      }

      const updateUserCase = new UpdateUserUseCase();

      const updatedUser = await updateUserCase.execute(
        userId,
        updateUserParams
      );

      return successfulRequest(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ error: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
