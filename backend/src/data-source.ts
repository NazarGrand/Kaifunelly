import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
} from "./env-constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, "entities", "*.entity.{ts,js}")],
  migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  subscribers: [],
});
