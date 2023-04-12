import { conflictError } from "../../errors/conflict-error";
import { notFoundError } from "../../errors/not-found-error";
import { BookWithMagicCodeAndPages } from "../../protocols";
import repositoryBook from "../../repositories/book-repository";

async function postBook(book: BookWithMagicCodeAndPages, title: string) {
  const uniqueTitle = await repositoryBook.unique(title);
  if (uniqueTitle) throw conflictError("");

  const magicCode = await repositoryBook.createBook(book);

  return magicCode;
}

async function getBook(magicCode: string) {
  const book = await repositoryBook.findBook(magicCode);

  if (!book) throw notFoundError();

  return book;
}

const serviceBook = {
  postBook,
  getBook,
};

export default serviceBook;
