import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

/**
 * Configure where to pull in the environment based
 * configuratons, the environment is set in package.json
 * within the script command
 */
export const loadEnv = () => {
  const nodeEnv = process.env.NODE_ENV ?? "development";
  let candidates: string[];
  if (nodeEnv === "local") {
    candidates = [
      ".env.local",
      ".env.development.local",
      ".env.development",
      ".env",
    ];
  } else if (nodeEnv === "development") {
    candidates = [".env.development.local", ".env.development", ".env"];
  } else {
    candidates = [".env.production.local", ".env.production", ".env"];
  }

  const envPath = candidates
    .map((f) => path.resolve(process.cwd(), f))
    .find((p) => fs.existsSync(p));

  if (envPath) {
    dotenv.config({ path: envPath });
    console.log(`Loaded env from ${envPath}`);
  } else {
    dotenv.config(); // load default .env if present
    console.log("No specific env file found; loaded default .env (if present)");
  }
};
