import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, notFound, successfulRequest } from "./helpers.js";
import validator from "validator";

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isValid = validator.isUUID(httpRequest.params.userId);

      if (!isValid) {
        return badRequest({
          message: "The provided id is not valid!",
        });
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
