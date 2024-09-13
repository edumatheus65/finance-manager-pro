import { CreateUserUseCase } from "../use-cases/index.js";
import { EmailAlreadyInUseError } from "../erros/user.js";
import {
  checkIfEmailValid,
  checkPasswordIfValid,
  emailIsAlreadyInUseResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  serverError,
} from "./helpers/index.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length == 0) {
          return badRequest({ message: `Missing params: ${field}` });
        }
      }

      const passwordIsValid = checkPasswordIfValid(params.password);

      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      const emailIsValid = checkIfEmailValid(params.email);

      if (!emailIsValid) {
        return emailIsAlreadyInUseResponse();
      }

      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      // retornar a resposta para o usuário (status code)
      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ errorMessage: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
