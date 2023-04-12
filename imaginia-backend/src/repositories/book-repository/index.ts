import { prisma } from "../../config/database";
import { BookWithMagicCodeAndPages } from "../../protocols";

async function createBook(bookData: BookWithMagicCodeAndPages) {
  return await prisma.book.create({
    data: {
      title: bookData.title,
      author: bookData.author,
      professor: bookData.professor,
      magicCode: bookData.magicCode,
      pages: {
        create: bookData.pages,
      },
    },
    select: {
      magicCode: true,
    },
  });
}

async function findBook(magicCode: string) {
  return await prisma.book.findUnique({
    where: { magicCode },
    include: {
      pages: {
        orderBy: {
          pageNumber: "asc",
        },
      },
    },
  });
}

async function unique(title: string) {
  return await prisma.book.findFirst({ where: { title } });
}

const repositoryBook = {
  createBook,
  findBook,
  unique,
};

export default repositoryBook;
