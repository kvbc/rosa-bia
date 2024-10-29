import { Database } from "sqlite3";

export const loadDatabase = () => new Database("db/db.db");
