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
})