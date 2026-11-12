import { drizzle } from "drizzle-orm/node-postgres";
import { appEnv } from "../config/env";

const db = drizzle(appEnv.DATABASE_URL);

export default db;
