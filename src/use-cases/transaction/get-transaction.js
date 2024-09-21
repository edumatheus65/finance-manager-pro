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
      params.user_id
    );

    if (!user) {
      throw new UserNotFoundError(params.user_id);
    }

    const transaction =
      this.PostgresgetGetTransactionsByUserIdRepository.execute(params.user_id);

    return transaction;
  }
}
