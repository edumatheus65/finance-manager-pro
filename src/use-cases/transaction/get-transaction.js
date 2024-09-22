import { UserNotFoundError } from "../../erros/user.js";

export class GetTransactionsByUserIdUseCase {
  constructor(
    postgresGetUserByIdRepository,
    postgresgetGetTransactionsByUserIdRepository
  ) {
    this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    this.postgresgetGetTransactionsByUserIdRepository =
      postgresgetGetTransactionsByUserIdRepository;
  }
  async execute(params) {
    const user = await this.postgresGetUserByIdRepository.execute(
      params.userId
    );

    if (!user) {
      throw new UserNotFoundError(params.userId);
    }

    const transaction =
      this.postgresgetGetTransactionsByUserIdRepository.execute(params.userId);

    return transaction;
  }
}
