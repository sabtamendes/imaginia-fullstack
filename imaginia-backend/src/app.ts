import express, { Express } from "express";
import cors from "cors";
import { loadEnv } from "./config/envs";
import { usersRouter } from "./routes/users-router";
import { bookRouter } from "./routes/book-router";
import { connectDb, disconnectDB } from "./config/database";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/", usersRouter)
  .use("/book", bookRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
