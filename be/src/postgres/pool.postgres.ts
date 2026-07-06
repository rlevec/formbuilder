import { Pool, QueryResultRow } from "pg";

import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT) || 5432,
});

export const db = {
  async query<T extends QueryResultRow>(
    text: string,
    params?: any[]
  ): Promise<T[]> {
    const result = await pool.query<T>(text, params);
    return result.rows;
  },
};

export default pool;