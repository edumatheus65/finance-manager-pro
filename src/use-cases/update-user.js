import { EmailAlreadyInUseError } from "../erros/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/index.js";
import bcrypt from "bcrypt";
export class UpdateUserUseCase {
  constructor(postgresUpdateUserRepository) {
    this.postgresUpdateUserRepository = postgresUpdateUserRepository;
  }
  async execute(userId, updateParams) {
    if (updateParams.email) {
      const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

      const userWithProviderEmail =
        await postgresGetUserByEmailRepository.execute(updateParams.email);

      if (userWithProviderEmail && userWithProviderEmail.id != userId) {
        throw new EmailAlreadyInUseError(updateParams.email);
      }
    }

    const user = {
      ...updateParams,
    };

    if (updateParams.password) {
      const hashedPassword = await bcrypt.hash(updateParams.password, 10);

      user.password = hashedPassword;
    }

    const updatedUser = await this.postgresUpdateUserRepository.execute(
      userId,
      user
    );

    return updatedUser;
  }
}
