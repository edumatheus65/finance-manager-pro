import { CreateUserController } from "./create-user.js"

describe("Create User Controller", () => {
    // Esse stub é só uma class que vai retornar uma resposta pré definida pra gente para que a gente
    // possa testar nosso controller que é o que realmente a gente quer testar
    class CreateUserUseCaseStub {
        execute(user) {
            return user
        }
    }
    it("should return 201 when creating a user successfully", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: "Edu",
                last_name: "Doe",
                email: "john.doe@example.com",
                password: "password123"
            }
        }

        // Act
        const result = await createUserController.execute(httpRequest)

        // Assert
        expect(result.statusCode).toBe(201)
        expect(result.body).toBe(httpRequest.body)        
        expect(result.body).not.toBeUndefined()
        expect(result.body).not.toBeUndefined()

    })

    it('should return 400 if first_name is not provided', async () => {
        // Arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                last_name: "Doe",
                email: "john.doe@example.com",
                password: "password123"
            },
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it("should return 400 if last_name is not provided", async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: "Edu",
                email: "john.doe@example.com",
                password: "password123"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it("should return 400 if email is not provided", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: "Edu",
                last_name: "Doe",
                password: "password123"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 400 if email is not valid', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: "Edu",
                last_name: "Doe",
                email: "invalid_email",
                password: "password123"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)       
    })

    it('should return 400 if password is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: "Edu",
                last_name: "Doe",
                email: "john.doe@example.com"               
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })

    it("should returned 400 if password is less than 6 characters", async () => {
        const createUserUseCase = new CreateUserUseCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        const httpRequest = {
            body: {
                first_name: "Edu",
                last_name: "Doe",
                email: "john.doe@example.com",
                password: "short"
            }
        }

        // act
        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })
})