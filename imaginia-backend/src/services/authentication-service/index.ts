import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GetUserOrFailResult, SignInParams, SignInResult } from "../../protocols";
import { exclude } from "../../utils/prisma-utils";
import userRepository from "../../repositories/users-repository";
import { invalidCredentialsError } from "../../errors/invalid-credetentials";
import sessionRepository from "../../repositories/session-repository";

async function userSignin(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;
  console.log(email, password, "email e senha e depois disso ver se o usuário existe, senão existe não vai aparecer nada")
  const user = await getUserOrFail(email);
console.log(user, "usuário existe")
  await validatePasswordOrFail(password, user.password);
  console.log(user, "usuário passou na validação da senha")
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
  console.log(user,"usuário tem email e é válido")
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

  console.log(isPasswordValid, "a senha é inválida, usuário tem a senha errada")
  if (!isPasswordValid) throw invalidCredentialsError();
console.log(isPasswordValid, "a senha é válida")
  return isPasswordValid;
}

const authenticationService = {
  userSignin,
};

export default authenticationService;
