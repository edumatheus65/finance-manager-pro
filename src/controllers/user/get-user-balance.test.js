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

  it("should return 400 if user id is not valid", async () => {
    // arrange
    const { sut } = makeSut();

    const httpResponse = await sut.execute({
      params: { userId: "invalid_id" },
    });

    expect(httpResponse.statusCode).toBe(400);
  });

  it("should return 500 if GetUserBalanceUseCase throws", async () => {
    // arrange
    const { getUserBallanceUseCase, sut } = makeSut();
    jest
      .spyOn(getUserBallanceUseCase, "execute")
      .mockRejectedValueOnce(new Error());

    // act
    const httpResponse = await sut.execute(httpRequest);

    // assert
    expect(httpResponse.statusCode).toBe(500);
  });
});
