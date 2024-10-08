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
    const files = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith(".sql"));

    for (const file of files) {
      const filePath = path.join(__dirname, file);
      const script = fs.readFileSync(filePath, "utf8");

      await client.query(script);

      console.log(`Migration for file ${file} executed successfully`);
    }

    console.log("All Migrations were executed successfully!");
  } catch (error) {
    console.error(error, "Error connecting");
  } finally {
    await client.release();
  }
};

execMigrations();
