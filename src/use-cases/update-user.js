import { EmailAlreadyInUseError } from "../erros/user.js";
import bcrypt from "bcrypt";
export class UpdateUserUseCase {
  constructor(postgresGetUserByEmailRepository, postgresUpdateUserRepository) {
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
    this.postgresUpdateUserRepository = postgresUpdateUserRepository;
  }
  async execute(userId, updateParams) {
    if (updateParams.email) {
      const userWithProviderEmail =
        await this.postgresGetUserByEmailRepository.execute(updateParams.email);

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
