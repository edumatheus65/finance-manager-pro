import validator from "validator";
import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, serverError } from "./helpers.js";

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      // validar a requisição (campos obrigatórios, tamanho de senha e email)
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length == 0) {
          return badRequest({ message: `Missing params: ${field}` });
        }
      }

      const passwordIsValid = params.password.length < 6;

      if (passwordIsValid) {
        return badRequest({
          message: "Password must be at least 6 characters!",
        });
      }

      const emailIsValid = validator.isEmail(params.email);

      if (!emailIsValid) {
        return badRequest({
          message: "Invalid e-mail. Please provide a valid one!",
        });
      }

      // Chamar o use case
      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      // retornar a resposta para o usuário (status code)
      return created(createdUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
