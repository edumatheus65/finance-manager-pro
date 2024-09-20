import {
  checkIfAmountIsValid,
  checkIfIdValid,
  checkIfTypeIsValid,
  created,
  invalidAmountResponse,
  invalidIdResponse,
  invalidTypeResponse,
  requiredFieldsMissingResponse,
  serverError,
  validateRequiredField,
} from "../helpers/index.js";

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["name", "user_id", "date", "amount", "type"];

      const { ok: requiredFieldsWereProvided, missingField } =
        validateRequiredField(params, requiredFields);

      if (!requiredFieldsWereProvided) {
        return requiredFieldsMissingResponse(missingField);
      }

      const userIdIsValid = checkIfIdValid(params.user_id);

      if (!userIdIsValid) {
        invalidIdResponse();
      }

      const amountIsValid = checkIfAmountIsValid(params.amount);

      if (!amountIsValid) {
        return invalidAmountResponse();
      }

      const type = params.type.trim().toUpperCase();

      const typeIsValid = checkIfTypeIsValid(type);

      if (!typeIsValid) {
        return invalidTypeResponse();
      }

      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        amount: params.amount,
        type: type,
      });

      return created(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
