import pool from "../postgres/pool.postgres"

export const findUserByEmail = async(email: string) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
  );

  return result.rows[0] || null;
}

export const findUserById = async(id: number) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0] || null;
}

export const createUser = async (data: {
  email: string;
  password: string;
}) => {
  const result = await pool.query(
    `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email, created_at
    `,
    [data.email, data.password]
  );

  return result.rows[0];
};

export const updatePassword = async(id: number, password: string) => {

}