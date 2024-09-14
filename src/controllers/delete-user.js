import { DeleteUserUseCase } from "../use-cases/index.js";
import {
  checkIfIdValid,
  invalidIdResponse,
  successfulRequest,
  userNotFoundResponse,
} from "./helpers/index.js";

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const isValid = checkIfIdValid(httpRequest.params.userId);

      if (!isValid) {
        return invalidIdResponse();
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const user = await deleteUserUseCase.execute(httpRequest.params.userId);

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
