import {  Prisma, User } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type MagicBook = {
  title: string;
  author: string;
  professor: string;
  pages: Prisma.PageCreateInput[];
};

export type Pages = {
  pageNumber: number;
  pageType: PageType;
  content: string;
}[];

export type BookWithMagicCodeAndPages = {
  title: string;
  author: string;
  professor: string;
  magicCode: string;
  pages: Prisma.PageCreateInput[];
}

export type PageType = "TEXT" | "IMAGE";


export type SignInParams = Pick<User, "email" | "password">;

export type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

export type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;


export type CreateUserParams = Pick<User, "email" | "password">;