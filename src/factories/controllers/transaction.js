import { CreateTransactionController } from "../../controllers/index.js";
import {
  CreateTransactionUseCase,
  GetTransactionsByUserIdUseCase,
} from "../../use-cases/index.js";
import {
  PostgresGetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresgetGetTransactionsByUserIdRepository,
} from "../../repositories/postgres/index.js";
import { GetTransactionsByUserIdController } from "../../controllers/transaction/get-transaction.js";

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
