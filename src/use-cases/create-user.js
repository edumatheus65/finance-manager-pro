import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmail } from "../repositories/postgres/get-user-by-email.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    // TODO: verificar se o e-mail já está em uso
    const postgresGetUserByEmail = new PostgresGetUserByEmail();

    const userWithProviderEmail = await postgresGetUserByEmail.execute(
      createUserParams.email
    );

    if (!userWithProviderEmail) {
      throw new Error("The provider e-mail is already in use.");
    }

    // gerar id do usuário
    const userId = uuidv4();

    // criptografar a senha
    const hashedPassword = bcrypt.hash(createUserParams.password, 10);

    // inserir o usuário no banco de dados
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    // chamar o repositório
    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
