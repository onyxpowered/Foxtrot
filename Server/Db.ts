import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as Schema from "./Schema.ts";

const Sqlite = new Database(process.env.DB_PATH ?? "Foxtrot.db");
Sqlite.exec("PRAGMA journal_mode = WAL;");

export const Db = drizzle(Sqlite, { schema: Schema });
