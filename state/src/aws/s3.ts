import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const fs = require("fs/promises");

const DEFAULT_REGION = "us-east-1";
const DEFAULT_MAX_KEYS = 1000;

export class S3Bucket {
  private readonly name: string;
  private readonly client: S3Client;

  constructor(name: string, region: string = DEFAULT_REGION) {
    this.name = name;
    this.client = new S3Client({
      region,
    });
  }

  async init(): Promise<void> {
    try {
      // Note: This command succeeds if the bucket already exists.
      let data = await this.client.send(
        new CreateBucketCommand({ Bucket: this.name })
      );
      console.log(`Successfully created a bucket called ${data.Location}`);
    } catch (err) {
      throw new Error(`Error creating bucket: ${err}`);
    }
  }

  async delete(): Promise<void> {
    let objects = await this.list_objects();
    await this.delete_objects(objects);

    const command = new DeleteBucketCommand({
      Bucket: this.name,
    });

    try {
      await this.client.send(command);
      console.log(`Successfully deleted bucket called: ${this.name}`);
    } catch (err) {
      throw new Error(`Error deleting bucket: ${err}`);
    }
  }

  async add_object(key: string, pathlike: string): Promise<void> {
    try {
      const data = await fs.readFile(pathlike, { encoding: "utf8" });

      const command = new PutObjectCommand({
        Bucket: this.name,
        Key: key,
        Body: data,
      });

      const response = await this.client.send(command);

      if (response.$metadata.httpStatusCode !== 200) {
        console.error(`add_object response: ${response}`);
      }

    } catch (err) {
      throw new Error(`Error adding object: ${err}`);
    }
  }

  private async delete_objects(objects: string[]): Promise<void> {
    const command = new DeleteObjectsCommand({
      Bucket: this.name,
      Delete: {
        Objects: objects.map((key) => ({ Key: key })),
      },
    });

    try {
      await this.client.send(command);
    } catch (err) {
      throw new Error(`Error deleting objects: ${err}`);
    }
  }

  private async list_objects(): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: this.name,
      MaxKeys: DEFAULT_MAX_KEYS,
    });

    try {
      let isTruncated = true;
      let contents: string[] = [];

      while (isTruncated) {
        const {
          Contents,
          IsTruncated,
          NextContinuationToken
        } = await this.client.send(command);

        Contents!.map((c) => contents.push(c.Key!));

        isTruncated = IsTruncated!;
        command.input.ContinuationToken = NextContinuationToken;
      }
      return contents;
    } catch (err) {
      throw new Error(`Error listing objects: ${err}`);
    }
  }
}
