import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { appEnv } from "../config/env";

const pool = new Pool({
  connectionString: appEnv.DATABASE_URL,
  max: 1,
});
const db = drizzle({ client: pool });

await migrate(db, { migrationsFolder: "./src/infra/db/migrations" });

await pool.end();

process.exit();
