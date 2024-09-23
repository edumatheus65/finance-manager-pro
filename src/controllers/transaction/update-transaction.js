import {
  badRequest,
  checkIfAmountIsValid,
  checkIfIdValid,
  checkIfTypeIsValid,
  invalidAmountResponse,
  invalidIdResponse,
  invalidTypeResponse,
  successfulRequest,
} from "../helpers/index.js";

export class UpdateTransactionController {
  constructor(updateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }

  async execute(httpRequest) {
    const isIdValid = checkIfIdValid(httpRequest.params.transactionId);

    if (!isIdValid) {
      return invalidIdResponse();
    }

    const params = httpRequest.body;

    const allowedFields = ["name", "date", "amount", "type"];

    const someFieldsIsNotAllowed = Object.keys(params).some(
      (field) => !allowedFields.includes(field)
    );

    if (someFieldsIsNotAllowed) {
      return badRequest({
        errooMessage: "Some provided field is not allowed",
      });
    }

    if (params.amount) {
      const amountIsValid = checkIfAmountIsValid(params.amount);

      if (!amountIsValid) {
        return invalidAmountResponse();
      }
    }

    if (params.type) {
      const typeIsValid = checkIfTypeIsValid(params.type);

      if (!typeIsValid) {
        return invalidTypeResponse();
      }
    }

    const transaction = await this.updateTransactionUseCase.execute(
      httpRequest.params.transactionId,
      params
    );

    return successfulRequest(transaction);
  }
}
