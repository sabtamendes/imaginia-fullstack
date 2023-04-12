import { getBook, postBook } from "../controllers/book-controller";
import { Router } from "express";
import {
  validateBody,
  validateParams,
} from "../middlewares/validation-middleware";
import { createBookSchema, magicCodeSchema } from "../schemas/book-schemas";

const bookRouter = Router();

bookRouter
  .post("/", validateBody(createBookSchema), postBook)
  .get("/", validateParams(magicCodeSchema), getBook);

export { bookRouter };
