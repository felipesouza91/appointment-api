import { drizzle } from "drizzle-orm/node-postgres";
import { appEnv } from "../config/env";
import * as schema from "./schema";

const db = drizzle(appEnv.DATABASE_URL, {
  schema,
  logger: appEnv.PROFILE === "DEV",
});

export default db;
