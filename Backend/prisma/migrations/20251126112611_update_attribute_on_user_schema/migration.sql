-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubId" TEXT,
ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
