import { Request, Response } from "express";
import httpStatus from "http-status";
import { SignInParams } from "../protocols";
import userService from "../services/users-service";
import authenticationService from "../services/authentication-service";

export async function userSignup(req: Request, res: Response) {
  const { email, password } = req.body;
console.log(req.body, "cadastro")
  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.log(error, "erro cadastro")
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send({});
    }
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function userSignin(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.userSignin({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
