import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const prismaClient = new PrismaClient({
  log: ["query", "info", "error", "warn"],
  adapter,
});
export default prismaClient;
