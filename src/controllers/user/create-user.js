import { EmailAlreadyInUseError } from "../../erros/user.js";
import {
  checkIfEmailValid,
  checkPasswordIfValid,
  emailIsAlreadyInUseResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  serverError,
  validateRequiredField,
} from "../helpers/index.js";

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];

      const { ok: requiredFieldsWereProvided, missingField } =
        validateRequiredField(params, requiredFields);

      if (!requiredFieldsWereProvided) {
        return badRequest({
          message: `The field ${missingField} is required`,
        });
      }

      const passwordIsValid = checkPasswordIfValid(params.password);

      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      const emailIsValid = checkIfEmailValid(params.email);

      if (!emailIsValid) {
        return emailIsAlreadyInUseResponse();
      }

      const createdUser = await this.createUserUseCase.execute(params);

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
