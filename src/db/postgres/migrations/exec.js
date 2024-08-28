import "dotenv/config.js";
import { pool } from "../helper.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filePath);

const execMigrations = async () => {
  const client = await pool.connect();

  try {
    const filePath = path.join(__dirname, "01-init.sql");
    const script = fs.readFileSync(filePath, "utf8");

    await client.query(script);

    console.log("Migrations started with success!");
  } catch (error) {
    console.error(error, "Error connecting");
  } finally {
    await client.release();
  }
};

execMigrations();
