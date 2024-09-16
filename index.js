import "dotenv/config.js";
import express from "express";
import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
} from "./src/controllers/index.js";
import {
  PostgresGetUserByIdRepository,
  PostgresCreateUserRepository,
  PostgresUpdateUserRepository,
  PostgresDeleteUserRepository,
  PostgresGetUserByEmailRepository,
} from "./src/repositories/postgres/index.js";
import {
  GetUserByIdUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from "./src/use-cases/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const postgresCreateUserRepository = new PostgresCreateUserRepository();

  const createUserUseCase = new CreateUserUseCase(
    getUserByEmailRepository,
    postgresCreateUserRepository
  );

  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (req, res) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

  const updateUserUseCase = new UpdateUserUseCase(
    getUserByEmailRepository,
    postgresUpdateUserRepository
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);

  const { statusCode, body } = await updateUserController.execute(req);

  res.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(postgresDeleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  const { statusCode, body } = await deleteUserController.execute(req);

  res.status(statusCode).send(body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Press Ctrl-C to stop the server`);
});
