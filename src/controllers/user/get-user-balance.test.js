import { faker } from "@faker-js/faker";
import { GetUserBalanceController } from "./get-user-balance";

describe("Get User Ballance Controller", () => {
  class GetUserBallanceControllerStub {
    async execute() {
      return faker.number.int();
    }
  }

  const makeSut = () => {
    const getUserBallanceUseCase = new GetUserBallanceControllerStub();
    const sut = new GetUserBalanceController(getUserBallanceUseCase);

    return { getUserBallanceUseCase, sut };
  };

  const httpRequest = {
    params: {
      userId: faker.string.uuid(),
    },
  };

  it("should return 200 when getting user ballance", async () => {
    // arrange
    const { sut } = makeSut();

    // act
    const httpResponse = await sut.execute(httpRequest);

    // assert
    expect(httpResponse.statusCode).toBe(200);
  });
});
