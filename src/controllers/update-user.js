import { badRequest, serverError, successfulRequest } from "./helpers/http.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { EmailAlreadyInUseError } from "../erros/user.js";
import {
  checkIfEmailValid,
  checkIfIdValid,
  checkPasswordIfValid,
  emailIsAlreadyInUseResponse,
  invalidIdResponse,
  invalidPasswordResponse,
} from "./helpers/user.js";

export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;

      const isIdValid = checkIfIdValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const params = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldsIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field)
      );

      if (someFieldsIsNotAllowed) {
        return badRequest({
          errorMessage: "Some provided field is not allowed",
        });
      }

      if (params.password) {
        const passwordIsValid = checkPasswordIfValid(params.password);

        if (!passwordIsValid) {
          return invalidPasswordResponse();
        }
      }

      if (params.email) {
        const emailIsValid = checkIfEmailValid(params.email);

        if (!emailIsValid) {
          return emailIsAlreadyInUseResponse();
        }
      }

      const updateUserCase = new UpdateUserUseCase();

      const updatedUser = await updateUserCase.execute(userId, params);

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
