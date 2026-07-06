import fs from "fs";
import path from "path";
import pool from "./pool.postgres";

export async function initPostgresDb() {
  const sqlPath = path.resolve("src/postgres/schemas.postgres.sql");

  const usersSql = fs.readFileSync(sqlPath, "utf-8");

  await pool.query(usersSql);

  console.log("DB initialized");
}