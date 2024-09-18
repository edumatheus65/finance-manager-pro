import {
  checkIfIdValid,
  invalidIdResponse,
  successfulRequest,
  userNotFoundResponse,
} from "../helpers/index.js";

export class DeleteUserController {
  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const isValid = checkIfIdValid(httpRequest.params.userId);

      if (!isValid) {
        return invalidIdResponse();
      }

      const user = await this.deleteUserUseCase.execute(
        httpRequest.params.userId
      );

      if (!user) {
        return userNotFoundResponse();
      }

      return successfulRequest(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
