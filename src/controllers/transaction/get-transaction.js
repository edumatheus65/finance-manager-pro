import { UserNotFoundError } from "../../erros/user.js";
import {
  checkIfIdValid,
  invalidIdResponse,
  requiredFieldsMissingResponse,
  serverError,
  successfulRequest,
  userNotFoundResponse,
} from "../helpers/index.js";

export class GetTransactionsByUserIdController {
  constructor(getTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;

      if (!userId) {
        return requiredFieldsMissingResponse();
      }

      const isIdValid = checkIfIdValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const transactions = await this.getTransactionsByUserIdUseCase.execute({
        userId,
      });

      return successfulRequest(transactions);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      console.error(error);
      return serverError();
    }
  }
}
