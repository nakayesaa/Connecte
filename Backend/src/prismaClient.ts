import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ["query", "info", "error", "warn"],
});
export default prismaClient;
