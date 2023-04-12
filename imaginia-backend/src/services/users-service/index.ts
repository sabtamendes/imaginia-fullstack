import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { exclude } from "../../utils/prisma-utils";
import {
  CreateUserParams,
  GetUserOrFailResult,
  SignInParams,
  SignInResult,
} from "../../protocols";
import userRepository from "../../repositories/users-repository";
import { duplicatedEmailError } from "../../errors/email-duplicated";
import { invalidCredentialsError } from "../../errors/invalid-credetentials";
import sessionRepository from "../../repositories/session-repository";

export async function createUser({
  email,
  password,
}: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function signIn(params: SignInParams): Promise<SignInResult> {
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
}

const userService = {
  createUser,
  signIn,
};

export default userService;
