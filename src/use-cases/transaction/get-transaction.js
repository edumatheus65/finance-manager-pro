import { UserNotFoundError } from "../../erros/user";

export class GetTransactionsByUserIdUseCase {
  constructor(
    PostgresGetUserByIdRepository,
    PostgresgetGetTransactionsByUserIdRepository
  ) {
    this.PostgresGetUserByIdRepository = PostgresGetUserByIdRepository;
    this.PostgresgetGetTransactionsByUserIdRepository =
      PostgresgetGetTransactionsByUserIdRepository;
  }
  async execute(params) {
    const user = await this.PostgresGetUserByIdRepository.execute(
      params.userId
    );

    if (!user) {
      throw new UserNotFoundError(params.userId);
    }

    const transaction =
      this.PostgresgetGetTransactionsByUserIdRepository.execute(params.userId);

    return transaction;
  }
}
