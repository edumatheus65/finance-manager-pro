import { UserNotFoundError } from "../../erros/user";

export class UpdateTransactionUseCase {
  constructor(
    postgresGetUserByIdRepository,
    postgresUpdateTransactionRepository
  ) {
    this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    this.postgresUpdateTransactionRepository =
      postgresUpdateTransactionRepository;
  }

  async execute(updateParams) {
    const user = await this.postgresGetUserByIdRepository.execute(
      updateParams.userId
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    const transaction = await this.postgresUpdateTransactionRepository.execute(
      updateParams
    );

    return transaction;
  }
}
