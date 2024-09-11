import { EmailAlreadyInUseError } from "../erros/user";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email";
import bcrypt from "bcrypt";
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user-by";

export class UpdateUserUseCase {
  async execute(userId, updateParams) {
    //1. Se o email estiver sendo atualizado, verificar se ele já está em uso

    if (updateParams.email) {
      const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

      const userWithProviderEmail =
        await postgresGetUserByEmailRepository.execute(updateParams.email);

      if (userWithProviderEmail) {
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
