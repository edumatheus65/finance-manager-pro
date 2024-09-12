import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { notFound, successfulRequest } from "./helpers/http.js";
import validator from "validator";
import { invalidIdResponse } from "./helpers/user.js";

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isValid = validator.isUUID(httpRequest.params.userId);

      if (!isValid) {
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
