import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
  UpdateTransactionController,
} from "../../controllers/index.js";
import {
  CreateTransactionUseCase,
  GetTransactionsByUserIdUseCase,
  UpdateTransactionUseCase,
} from "../../use-cases/index.js";
import {
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresgetGetTransactionsByUserIdRepository,
  PostgresUpdateTransactionRepository,
} from "../../repositories/postgres/index.js";

export const makeGetTransactionByUserIdController = () => {
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

  const postgresgetGetTransactionsByUserIdRepository =
    new PostgresgetGetTransactionsByUserIdRepository();

  const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
    postgresGetUserByIdRepository,
    postgresgetGetTransactionsByUserIdRepository
  );

  const getTransactionByUserIdController =
    new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

  return getTransactionByUserIdController;
};

export const makeCreateTransactionController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const createTransactionRepository = new PostgresCreateTransactionRepository();

  const createTransactionUseCase = new CreateTransactionUseCase(
    getUserByIdRepository,
    createTransactionRepository
  );

  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase
  );

  return createTransactionController;
};

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateTransactionRepository();

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository
  );

  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase
  );

  return updateTransactionController;
};
