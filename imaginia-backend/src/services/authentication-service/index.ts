import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GetUserOrFailResult, SignInParams, SignInResult } from "../../protocols";
import { exclude } from "../../utils/prisma-utils";
import userRepository from "../../repositories/users-repository";
import { invalidCredentialsError } from "../../errors/invalid-credetentials";
import sessionRepository from "../../repositories/session-repository";

async function userSignin(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);
 
  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
  });

  if (!user) throw invalidCredentialsError();
 
  return user;
}

async function createSession(userId: number) {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
 
  const isPasswordValid = await bcrypt.compare(password, userPassword);

  if (!isPasswordValid) throw invalidCredentialsError();

  return isPasswordValid;
}

const authenticationService = {
  userSignin,
};

export default authenticationService;
