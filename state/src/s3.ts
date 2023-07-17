import {
  CreateBucketCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const uuid = "d0d70723-6e50-4941-bea6-499a162e8a7e";
const BUCKET = `test-bucket-${uuid}`;

async function create_bucket_example() {
  const params = {
    Bucket: BUCKET,
    Key: "my_file.txt",
    Body: "Hello world!",
  };

  const s3Client = new S3Client({ region: "us-east-1" });
  // Create an Amazon S3 bucket.
  try {
    const data = await s3Client.send(
      new CreateBucketCommand({ Bucket: params.Bucket })
    );
    console.log(data);
    console.log("Successfully created a bucket called ", data.Location);
  } catch (err) {
    console.log("Error", err);
  }
  // Create an object and upload it to the Amazon S3 bucket.
  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully created " +
      params.Key +
      " and uploaded it to " +
      params.Bucket +
      "/" +
      params.Key
    );
    return results;
  } catch (err) {
    console.log("Error", err);
  }
}

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

export class S3Bucket {
  private readonly name: string;
  private readonly region: string;

  constructor(name: string, region: string = DEFAULT_REGION) {
    this.name = name;
    this.region = region;


  }

  get created(): boolean {
    return false;
  }
}

export function example() {
  // create_bucket_example();
  // delete_objects_example();
}
