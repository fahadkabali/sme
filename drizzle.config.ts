import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
    path: ".env.local",
});

if (!process.env.NEON_DATABASE_URL)
    throw new Error("NEON DATABASE_URL not found in environment");

export default {
    schema: "./src/app/db/schema.ts",
    out: "./src/app/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEON_DATABASE_URL,
 },
} satisfies Config;