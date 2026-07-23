import type { CanvasFieldInstance } from "../types";
import pool from "../postgres/pool.postgres";

import { throwNewError } from "../utils/global.utils";

export const createTemplate = async (data: {
  userId: number;
  fields: CanvasFieldInstance[];
  form: Record<string, string | boolean>;
}) => {
  try {
    const template = {
      id: crypto.randomUUID(),
      fields: data.fields,
      form: data.form,
      createdAt: new Date().toISOString(),
    };

    const result = await pool.query(
      `
      INSERT INTO form_templates (
        user_id,
        templates
      )
      VALUES ($1, $2)
      RETURNING *
      `,
      [data.userId, JSON.stringify([template])]
    );

    return result.rows[0];
  } catch (error) {
    return throwNewError(400, "DB insertion error")
  }
};