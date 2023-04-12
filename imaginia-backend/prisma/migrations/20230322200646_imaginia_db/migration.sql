-- CreateEnum
CREATE TYPE "PageType" AS ENUM ('TEXT', 'IMAGE');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "professor" VARCHAR(255) NOT NULL,
    "magicCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "pageType" "PageType" NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_magicCode_key" ON "Book"("magicCode");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
