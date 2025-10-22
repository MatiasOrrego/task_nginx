import { Pool } from "pg";
import { Env } from "../config/env";
    
const pool = new Pool({
    connectionString: Env.DATABASE_URL
});

export default pool;
