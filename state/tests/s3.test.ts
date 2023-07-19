// @ts-expect-error
//
// tsc is confused about the lack of file extensions.
import { S3Bucket } from "../src/s3";

test("Testing S3Bucket class", async () => {
  let bucket = new S3Bucket("bucket-name-4aaa2eaa-b7bf-4d35-aa59-c2a052a98d26");
  {
    let result = await bucket.init();
    expect(result.is_ok()).toBe(true);
  }

  {
    let result = await bucket.delete();
    expect(result.is_ok()).toBe(true);
  }
});
