import "dotenv/config.js";
import express from "express"; // The express for default not supported Json syntax
import { PostgresHelper } from "./src/db/postgres/helper.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/users", async (req, res) => {
  const results = await PostgresHelper.query("SELECT * FROM users;");

  res.send(JSON.stringify(results));
});

app.post("/api/users", async (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  res.status(201).send("User created successfully");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Press Ctrl-C to stop the server`);
});
