import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db/data-source";
import router from "./routes/index";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error: unknown) => {
    console.error("Error during Data Source initialization:", error);
  });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express + TypeScript + TypeORM server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
