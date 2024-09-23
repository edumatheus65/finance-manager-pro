import {
  checkIfIdValid,
  invalidIdResponse,
  serverError,
  userNotFoundResponse,
} from "../helpers/index.js";

export class GetUserBalanceController {
  constructor(getUserBalanceUseCase) {
    this.getUserBalanceUseCase = getUserBalanceUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const balance = await this.getUserBalanceUseCase.execute({ userId });

      return successfulRequest(balance);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }
      console.error(error);
      return serverError();
    }
  }
}
