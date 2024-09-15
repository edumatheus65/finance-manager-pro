import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/index.js";
import { EmailAlreadyInUseError } from "../erros/user.js";

export class CreateUserUseCase {
  constructor(postgresCreateUserRepository) {
    this.postgresCreateUserRepository = postgresCreateUserRepository;
  }
  async execute(createUserParams) {
    const postgresGetUserByEmail = new PostgresGetUserByEmailRepository();

    const userWithProviderEmail = await postgresGetUserByEmail.execute(
      createUserParams.email
    );

    if (userWithProviderEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const createdUser = await this.postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
