import { userSignin, userSignup } from "../controllers/users-controller";
import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema, signInSchema } from "../schemas/users-schemas";

const usersRouter = Router();

usersRouter
  .post("/sign-up", validateBody(createUserSchema), userSignup)
  .post("/sign-in", validateBody(signInSchema), userSignin);

export { usersRouter };
