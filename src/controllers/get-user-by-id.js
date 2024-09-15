import {
  checkIfIdValid,
  invalidIdResponse,
  notFound,
  serverError,
  successfulRequest,
} from "./helpers/index.js";

export class GetUserByIdController {
  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }
  async execute(httpRequest) {
    try {
      const isIdValid = checkIfIdValid(httpRequest.params.userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(
        httpRequest.params.userId
      );

      if (!user) {
        return notFound({
          message: "User not found",
        });
      }

      return successfulRequest(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
