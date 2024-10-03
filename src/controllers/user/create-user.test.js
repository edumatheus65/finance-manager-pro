import { faker } from "@faker-js/faker";
import { CreateUserController } from "./create-user.js";
import { EmailAlreadyInUseError } from "../../erros/user.js";

describe("Create User Controller", () => {
  // Esse stub é só uma class que vai retornar uma resposta pré definida pra gente para que a gente
  // possa testar nosso controller que é o que realmente a gente quer testar
  class CreateUserUseCaseStub {
    async execute(user) {
      return user;
    }
  }

  const makeSut = () => {
    const createUserUseCase = new CreateUserUseCaseStub();
    const sut = new CreateUserController(createUserUseCase);

    return { createUserUseCase, sut };
  };

  const httpRequest = {
    body: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 7,
      }),
    },
  };

  it("should return 201 when creating a user successfully", async () => {
    // arrange
    const { sut } = makeSut();

    // Act
    const result = await sut.execute(httpRequest);

    // Assert
    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(httpRequest.body);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeUndefined();
  });

  it("should return 400 if first_name is not provided", async () => {
    // Arrange
    const { sut } = makeSut();

    // act
    const result = await sut.execute({
      body: { ...httpRequest.body, first_name: undefined },
    });

    // assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if last_name is not provided", async () => {
    const { sut } = makeSut();

    // act
    const result = await sut.execute({
      body: { ...httpRequest.body, last_name: undefined },
    });

    // assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not provided", async () => {
    // arrange
    const { sut } = makeSut();

    const result = await sut.execute({
      body: { ...httpRequest.body, email: undefined },
    });

    // assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not valid", async () => {
    // arrange
    const { sut } = makeSut();

    // act
    const result = await sut.execute({
      body: { ...httpRequest.body, email: "email_invalid" },
    });

    // assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if password is not provided", async () => {
    // arrange
    const { sut } = makeSut();

    // act
    const result = await sut.execute({
      body: { ...httpRequest.body, password: undefined },
    });

    // assert
    expect(result.statusCode).toBe(400);
  });

  it("should returned 400 if password is less than 6 characters", async () => {
    const { sut } = makeSut();

    // act
    const result = await sut.execute({
      body: {
        ...httpRequest.body,
        password: faker.internet.password({ length: 3 }),
      },
    });

    // assert
    expect(result.statusCode).toBe(400);
  });

  it("should call CreateUserUseCase with correct params", async () => {
    //   arrange
    const { createUserUseCase, sut } = makeSut();
    const executeSpy = jest.spyOn(createUserUseCase, "execute");

    // act
    await sut.execute(httpRequest);

    // assert
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it("should retur 500 if CreateUserUseCase throws", async () => {
    //   arrange
    const { createUserUseCase, sut } = makeSut();
    jest.spyOn(createUserUseCase, "execute").mockRejectedValueOnce(new Error());

    // act
    const result = await sut.execute(httpRequest);

    // assert
    expect(result.statusCode).toBe(500);
  });

  it("should return 500 createUserUseCase throws EmailAlreadyInUseError error", async () => {
    // arrange
    const { createUserUseCase, sut } = makeSut();
    jest
      .spyOn(createUserUseCase, "execute")
      .mockRejectedValue(new EmailAlreadyInUseError(httpRequest.body.email));

    // act
    const result = await sut.execute(httpRequest);

    // assert
    expect(result.statusCode).toBe(400);
  });
});
