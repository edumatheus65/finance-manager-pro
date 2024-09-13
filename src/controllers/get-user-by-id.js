import { GetUserByIdUseCase } from "../use-cases/index.js";
import {
  checkIfIdValid,
  invalidIdResponse,
  notFound,
  successfulRequest,
} from "./helpers/index.js";

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isIdValid = checkIfIdValid(httpRequest.params.userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);

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
