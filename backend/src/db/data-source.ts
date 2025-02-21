import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import { constants } from "../env-constants";
import InitSeeder from "./seeds/InitSeeder";
import { SeederOptions } from "typeorm-extension";

const DataSourceOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: constants.DB_HOST,
  port: parseInt(constants.DB_PORT || "5432"),
  username: constants.DB_USERNAME,
  password: constants.DB_PASSWORD,
  database: constants.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, "..", "entities", "*.entity.{js,ts}")],
  migrations: [join(__dirname, "migrations", "*.{js,ts}")],
  seeds: [InitSeeder],
  subscribers: [],
};

export const AppDataSource = new DataSource(DataSourceOptions);
