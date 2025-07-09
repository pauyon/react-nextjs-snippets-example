import { PrismaClient } from "@/generated/prisma"; // if using baseUrl in tsconfig.json

export const db = new PrismaClient();