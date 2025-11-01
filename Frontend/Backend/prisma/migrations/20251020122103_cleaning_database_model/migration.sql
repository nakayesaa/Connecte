/*
  Warnings:

  - You are about to drop the `_interesttopost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_interesttouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_posttorole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_posttoskill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_skilltouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_interesttopost` DROP FOREIGN KEY `_InterestToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_interesttopost` DROP FOREIGN KEY `_InterestToPost_B_fkey`;

-- DropForeignKey
ALTER TABLE `_interesttouser` DROP FOREIGN KEY `_InterestToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_interesttouser` DROP FOREIGN KEY `_InterestToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_posttorole` DROP FOREIGN KEY `_PostToRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_posttorole` DROP FOREIGN KEY `_PostToRole_B_fkey`;

-- DropForeignKey
ALTER TABLE `_posttoskill` DROP FOREIGN KEY `_PostToSkill_A_fkey`;

-- DropForeignKey
ALTER TABLE `_posttoskill` DROP FOREIGN KEY `_PostToSkill_B_fkey`;

-- DropForeignKey
ALTER TABLE `_skilltouser` DROP FOREIGN KEY `_SkillToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_skilltouser` DROP FOREIGN KEY `_SkillToUser_B_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_interesttopost`;

-- DropTable
DROP TABLE `_interesttouser`;

-- DropTable
DROP TABLE `_posttorole`;

-- DropTable
DROP TABLE `_posttoskill`;

-- DropTable
DROP TABLE `_skilltouser`;

-- DropTable
DROP TABLE `interest`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `skill`;
