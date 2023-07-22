import { cwd } from "node:process";
import { AwsConfig } from "../src/aws/config";

const path = require("path");

test("Reading AwsConfig from file", async () => {
  let filename = path.join(cwd(), "tests", "res", "config.json");
  let config = await AwsConfig.from_file(filename);

  expect(config.account_id).toBe("123456789");
  expect(config.username).toBe("asungy");

  config.set_env_vars();

  expect(process.env.AWS_ACCESS_KEY_ID).toBe("not-a-real-access-key");
  expect(process.env.AWS_SECRET_ACCESS_KEY).toBe("not-a-real-secret-key-either");
});
