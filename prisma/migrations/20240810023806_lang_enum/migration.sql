/*
  Warnings:

  - The `language` column on the `UserRepositories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserRepositories" DROP COLUMN "language",
ADD COLUMN     "language" TEXT[];
