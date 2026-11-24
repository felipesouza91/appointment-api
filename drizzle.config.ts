import { defineConfig } from "drizzle-kit";
import { appEnv } from "./src/infra/config/env";

export default defineConfig({
  out: "./src/infra/db/migrations",
  schema: "./src/infra/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: appEnv.DATABASE_URL,
  },
});
