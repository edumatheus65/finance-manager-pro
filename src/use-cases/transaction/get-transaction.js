import { UserNotFoundError } from "../../erros/user";

export class getTransactionsByUserIdUseCase {
  constructor(
    PostgresGetUserByIdRepository,
    PostgresgetTransactionsByUserIdRepository
  ) {
    this.PostgresGetUserByIdRepository = PostgresGetUserByIdRepository;
    this.PostgresgetTransactionsByUserIdRepository =
      PostgresgetTransactionsByUserIdRepository;
  }
  async execute(params) {
    const user = await this.PostgresGetUserByIdRepository.execute(
      params.user_id
    );

    if (!user) {
      throw new UserNotFoundError(params.user_id);
    }

    const transaction = this.PostgresgetTransactionsByUserIdRepository.execute(
      params.user_id
    );

    return transaction;
  }
}
