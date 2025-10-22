import { Pool } from "pg";

const url = process.env.DATABASE_URL;

export const pool = url
  ? new Pool({ connectionString: url })
  : new Pool({
      host: process.env.PGHOST ?? "localhost",
      port: Number(process.env.PGPORT ?? 5432),
      user: process.env.PGUSER ?? "postgres",
      password: String(process.env.PGPASSWORD ?? ""), // fuerza string
      database: process.env.PGDATABASE ?? "task_nginx",
    });

export default pool;
