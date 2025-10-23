
import { PrismaClient } from "./generated/prisma/index";

const prismaClient = new PrismaClient({
    log:["query", "info", "error", "warn"]
})
export default prismaClient;

