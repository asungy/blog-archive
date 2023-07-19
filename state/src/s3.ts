import {
  CreateBucketCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { Result, Void } from "./result";

const uuid = "d0d70723-6e50-4941-bea6-499a162e8a7e";
const BUCKET = `test-bucket-${uuid}`;

async function list_objects_example() {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    MaxKeys: 1000,
  });

  const s3Client = new S3Client({ region: "us-east-1" });

  try {
    let isTruncated = true;

    console.log("Bucket contains the following objects:\n");
    let contents = "";

    while (isTruncated) {
      const {
        Contents,
        IsTruncated,
        NextContinuationToken
      } = await s3Client.send(command);
      const contentsList = Contents!.map((c) => ` - ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated!;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);

  } catch (err) {
    console.error(err);
  }
}

async function delete_objects_example() {
  const s3Client = new S3Client({ region: "us-east-1" });
  const command = new DeleteObjectsCommand({
    Bucket: BUCKET,
    Delete: {
      Objects: []
    },
  });
}

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

  async init(): Promise<Result<Void | null, any>> {
    try {
      // Note: This command succeeds if the bucket already exists.
      let data = await this.client.send(
        new CreateBucketCommand({ Bucket: this.name })
      );
      console.log("Successfully created a bucket called ", data.Location);
      return new Result(new Void());
    } catch (err) {
      return new Result(null, err);
    }
  }

  async delete(): Promise<Result<Void | null, any>> {
    let objects = (await this.list_objects()).unwrap();
    console.log(`objects: ${objects}`);

    return new Result(new Void());
  }

  private async list_objects(): Promise<Result<string[] | null, any>> {
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

        for (const c in Contents!) {
          // @ts-expect-error
          //
          // tsc is being stupid here.
          contents.push(c.Key);
        }

        isTruncated = IsTruncated!;
        command.input.ContinuationToken = NextContinuationToken;
      }
      return new Result(contents, null);
    } catch (err) {
      return new Result(null, err);
    }

  }
}
