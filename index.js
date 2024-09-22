import "dotenv/config.js";
import express from "express";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from "./src/factories/controllers/user.js";
import {
  makeCreateTransactionController,
  makeGetTransactionByUserIdController,
} from "./src/factories/controllers/transaction.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (req, res) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute(req);

  res.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const deleteUserController = makeDeleteUserController();

  const { statusCode, body } = await deleteUserController.execute(req);

  res.status(statusCode).send(body);
});

app.post("/api/transaction", async (req, res) => {
  const createTransactionController = makeCreateTransactionController();

  const { statusCode, body } = await createTransactionController.execute(req);

  res.status(statusCode).send(body);
});

app.get("/api/transaction", async (req, res) => {
  const getTransactionByUserIdController =
    makeGetTransactionByUserIdController();

  const { statusCode, body } = await getTransactionByUserIdController.execute(
    req
  );

  res.status(statusCode).send(body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Press Ctrl-C to stop the server`);
});
