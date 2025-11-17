/*
  Warnings:

  - You are about to drop the column `like` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `save` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `share` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "like",
DROP COLUMN "save",
DROP COLUMN "share";
