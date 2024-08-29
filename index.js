import "dotenv/config.js";
import express from "express"; // The express for default not supported Json syntax

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Press Ctrl-C to stop the server`);
});
