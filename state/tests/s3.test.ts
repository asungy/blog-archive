import { S3Bucket } from "../src/s3";

test("Testing S3Bucket class", () => {
  let bucket = new S3Bucket("bucket-name");

  expect(bucket.created).toBe(false);
});
