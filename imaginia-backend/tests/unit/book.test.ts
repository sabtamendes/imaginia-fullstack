import { PageType } from "@prisma/client";
import serviceBook from "../../src/services/book-service";
import { BookWithMagicCodeAndPages } from "../protocols";

import * as errors from "errors";
import repositoryBook from "../../src/repositories/book-repository";
afterEach(() => {
  jest.restoreAllMocks();
});

describe("postBook service", () => {
  let uniqueSpy: jest.SpyInstance;
  let createSpy: jest.SpyInstance;
  beforeEach(() => {
    uniqueSpy = jest.spyOn(repositoryBook, "unique");
    createSpy = jest.spyOn(repositoryBook, "createBook");
  });
  it("should throw conflict error if title already exists", async () => {
    const book: BookWithMagicCodeAndPages = {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      professor: "Albus Dumbledore",
      magicCode: "ABDEFR",
      pages: [
        {
          pageNumber: 1,
          pageType: "TEXT",
          content: "Lorem ipsum dolor sit amet",
          Book: { connect: { magicCode: "ABDEFR" } },
        },
        {
          pageNumber: 2,
          pageType: "TEXT",
          content: "Lorem ipsum dolor sit amet",
          Book: { connect: { magicCode: "ABDEFR" } },
        },
      ],
    };

    const title = "The Art of Unit Testing";
    uniqueSpy.mockResolvedValue(true);

    await expect(serviceBook.postBook(book, title)).rejects.toEqual(
      errors.conflictError("")
    );

    expect(uniqueSpy).toHaveBeenCalledWith(title);
    expect(createSpy).not.toHaveBeenCalled();
  });

  it("should create a book when the title is unique", async () => {
    const book: BookWithMagicCodeAndPages = {
      title: "Clean Code",
      author: "Robert C. Martin",
      professor: "Jane Doe",
      magicCode: "ABDEFR",
      pages: [
        {
          pageNumber: 1,
          pageType: "TEXT",
          content: "Lorem ipsum dolor sit amet",
          Book: { connect: { magicCode: "ABDEFR" } },
        },
        {
          pageNumber: 2,
          pageType: "TEXT",
          content: "Lorem ipsum dolor sit amet",
          Book: { connect: { magicCode: "ABDEFR" } },
        },
      ],
    };
    const title = "Clean Code";
    uniqueSpy.mockResolvedValue(false);
    createSpy.mockResolvedValue("ABDEFR");

    const result = await serviceBook.postBook(book, title);

    expect(result).toEqual("ABDEFR");
    expect(uniqueSpy).toHaveBeenCalledWith(title);
    expect(createSpy).toHaveBeenCalledWith(book);
  });
});

describe("getBook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a book when the magic code exists", async () => {
    const magicCode = "ABDEFR";
    const book = {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      professor: "Albus Dumbledore",
      magicCode: "ABDEFR",
      createdAt: new Date(),
      pages: [
        {
          id: 1,
          bookId: 1,
          pageNumber: 1,
          pageType: PageType.TEXT,
          content: "Lorem ipsum dolor sit amet",
          Book: { connect: { magicCode: "ABDEFR" } },
        },
        {
          id: 2,
          bookId: 1,
          pageNumber: 2,
          pageType: PageType.TEXT,
          content: "Lorem ipsum dolor sit amet",
          Book: { connect: { magicCode: "ABDEFR" } },
        },
      ],
    };

    const resultado = jest
      .spyOn(repositoryBook, "findBook")
      .mockResolvedValueOnce(book);

    const result = await serviceBook.getBook(magicCode);

    expect(result).toEqual(book);
    expect(resultado).toHaveBeenCalledWith(magicCode);
  });

  it("should throw not found error when the magic code does not exist", async () => {
    const magicCode = "NONEXISTENT_CODE";

    const resultado = jest
      .spyOn(repositoryBook, "findBook")
      .mockResolvedValueOnce(null);

    await expect(serviceBook.getBook(magicCode)).rejects.toEqual(
      errors.notFoundError()
    );

    expect(resultado).toHaveBeenCalledWith(magicCode);
  });
});
