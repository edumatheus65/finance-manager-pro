import "dotenv/config.js";
import express from "express"; // The express for default not supported Json syntax
import { CreateUserController } from "./src/controllers/create-user.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const createUserController = new CreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Press Ctrl-C to stop the server`);
});
