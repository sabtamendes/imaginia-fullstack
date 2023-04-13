/*
  Warnings:

  - The values [IMAGE] on the enum `PageType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PageType_new" AS ENUM ('TEXT');
ALTER TABLE "Page" ALTER COLUMN "pageType" TYPE "PageType_new" USING ("pageType"::text::"PageType_new");
ALTER TYPE "PageType" RENAME TO "PageType_old";
ALTER TYPE "PageType_new" RENAME TO "PageType";
DROP TYPE "PageType_old";
COMMIT;
