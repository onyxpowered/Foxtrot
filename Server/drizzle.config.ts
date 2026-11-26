import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./Schema.ts",
  out: "./Migrations",
  dialect: "sqlite",
  dbCredentials: { url: process.env.DB_PATH ?? "Foxtrot.db" },
});
