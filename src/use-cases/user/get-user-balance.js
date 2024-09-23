import { UserNotFoundError } from "../../erros/user.js";

export class GetUserBalanceUseCase {
  constructor(postgresGetUserById, postgresGetUserBalanceRepository) {
    this.postgresGetUserById = postgresGetUserById;
    this.postgresGetUserBalanceRepository = postgresGetUserBalanceRepository;
  }
  async execute(params) {
    const user = await this.postgresGetUserById.execute(params.userId);

    if (!user) {
      throw new UserNotFoundError();
    }
    const balance = await this.postgresGetUserBalanceRepository.execute(
      params.userId
    );

    return balance;
  }
}
