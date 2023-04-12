import { Request, Response } from "express";
import httpStatus from "http-status";

import { randomBytes } from "crypto";
import serviceBook from "../services/book-service";
import { MagicBook } from "../protocols";

export async function postBook(req: Request, res: Response) {
  const { title, author, professor, pages } = req.body as MagicBook;

  const magicCode = generateRandomCode();
  const book = { title, author, professor, magicCode, pages };
  try {
    const code = await serviceBook.postBook(book, book.title);

    return res.status(httpStatus.CREATED).send(code);
  } catch (error) {
    if (error.name === "conflictError") {
      return res
        .status(httpStatus.CONFLICT)
        .send({ message: "Título já existe" });
    }
    if (error.name === "invalidDataError") {
      return res.status(httpStatus.BAD_REQUEST).send({});
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function getBook(req: Request, res: Response) {
  const magicCode = req.query.magicCode as unknown as string;
  try {
    const book = await serviceBook.getBook(magicCode);
    return res.status(httpStatus.OK).send(book);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({});
    }
    if (error.name === "invalidDataError") {
      return res.status(httpStatus.BAD_REQUEST).send({});
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export function generateRandomCode(): string {
  let code = "";
  while (code.length < 6) {
    const byte = randomBytes(1)[0];
    const char = String.fromCharCode(byte);
    if (char >= "A" && char <= "Z") {
      code += char;
    }
  }
  return code;
}
