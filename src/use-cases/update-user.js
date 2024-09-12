import { EmailAlreadyInUseError } from "../erros/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import bcrypt from "bcrypt";
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user-by.js";

export class UpdateUserUseCase {
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

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const updatedUser = await postgresUpdateUserRepository.execute(
      userId,
      user
    );

    return updatedUser;
  }
}
