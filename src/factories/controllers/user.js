import {
  CreateUserController,
  DeleteUserController,
  GetUserBalanceController,
  GetUserByIdController,
  UpdateUserController,
} from "../../controllers/index.js";
import {
  PostgresCreateUserRepository,
  PostgresDeleteUserRepository,
  PostgresGetUserBalanceRepository,
  PostgresGetUserByEmailRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from "../../repositories/postgres/index.js";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserBalanceUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from "../../use-cases/index.js";

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};

export const makeCreateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const postgresCreateUserRepository = new PostgresCreateUserRepository();

  const createUserUseCase = new CreateUserUseCase(
    getUserByEmailRepository,
    postgresCreateUserRepository
  );

  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};

export const makeUpdateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

  const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

  const updateUserUseCase = new UpdateUserUseCase(
    getUserByEmailRepository,
    postgresUpdateUserRepository
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};

export const makeDeleteUserController = () => {
  const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

  const deleteUserUseCase = new DeleteUserUseCase(postgresDeleteUserRepository);

  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};

export const makeGetUserBalanceController = () => {
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
  const postgresUserBalanceRepository = new PostgresGetUserBalanceRepository();

  const getUserBalanceUseCase = new GetUserBalanceUseCase(
    postgresGetUserByIdRepository,
    postgresUserBalanceRepository
  );

  const getUserBalanceController = new GetUserBalanceController(
    getUserBalanceUseCase
  );

  return getUserBalanceController;
};
