import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export function loadEnv() {
  const path =
  process.env.NODE_ENV === "production"
    ? ".env"
    : process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env.development";

  const currentEnvs = dotenv.config({ path });
  dotenvExpand.expand(currentEnvs);
}
