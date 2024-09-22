export class UpdateTransactionUseCase {
  constructor(postgresUpdateTransactionRepository) {
    this.postgresUpdateTransactionRepository =
      postgresUpdateTransactionRepository;
  }

  async execute(transactionId, updateParams) {
    const transaction = await this.postgresUpdateTransactionRepository.execute(
      transactionId,
      updateParams
    );

    return transaction;
  }
}
