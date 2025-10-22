import pool from "./pool.js";

export async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      estado TEXT NOT NULL DEFAULT 'pendiente'
    );`
);

}