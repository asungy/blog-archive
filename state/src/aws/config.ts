const fs = require("fs/promises");

const AWS_ACCESS_KEY_ID_KEY = "aws_access_key_id";
const AWS_SECRET_ACCESS_KEY_KEY = "aws_secret_access_key";
const ACCOUNT_ID_KEY = "account_id";
const USERNAME_KEY = "username";

export class AwsConfig {
  private readonly _account_id: string;
  private readonly _username: string;
  private readonly _aws_access_key_id: string;
  private readonly _aws_secret_access_key: string;

  static async from_file(filename: string): Promise<AwsConfig> {
    const data = await fs.readFile(filename, { encoding: "utf8" });
    const config_json = JSON.parse(data);

    if (!config_json.hasOwnProperty(ACCOUNT_ID_KEY)) {
      throw new Error(`Missing key: ${ACCOUNT_ID_KEY}`);
    }

    if (!config_json.hasOwnProperty(USERNAME_KEY)) {
      throw new Error(`Missing key: ${USERNAME_KEY}`);
    }

    if (!config_json.hasOwnProperty(AWS_ACCESS_KEY_ID_KEY)) {
      throw new Error(`Missing key: ${AWS_ACCESS_KEY_ID_KEY}`);
    }

    if (!config_json.hasOwnProperty(AWS_SECRET_ACCESS_KEY_KEY)) {
      throw new Error(`Missing key: ${AWS_SECRET_ACCESS_KEY_KEY}`);
    }

    return new AwsConfig(
      config_json[ACCOUNT_ID_KEY],
      config_json[USERNAME_KEY],
      config_json[AWS_ACCESS_KEY_ID_KEY],
      config_json[AWS_SECRET_ACCESS_KEY_KEY]
    );
  }

  constructor(
    account_id: string,
    username: string,
    aws_access_key_id: string,
    aws_secret_access_key: string
  ) {
    this._account_id = account_id;
    this._username = username;
    this._aws_access_key_id = aws_access_key_id;
    this._aws_secret_access_key = aws_secret_access_key;
  }

  get account_id(): string {
    return this._account_id;
  }

  get username(): string {
    return this._username;
  }

  set_env_vars(): void {
    process.env.AWS_ACCESS_KEY_ID = this._aws_access_key_id;
    process.env.AWS_SECRET_ACCESS_KEY = this._aws_secret_access_key;
  }
}
