import { S3Bucket } from "../src/s3";
import { cwd } from "node:process";

const path = require("path");

test.skip("Create and delete S3 bucket", async () => {
  let bucket = new S3Bucket("bucket-name-4aaa2eaa-b7bf-4d35-aa59-c2a052a98d26");

  await bucket.init();

  await bucket.add_object( "README.md", path.join(cwd(), "README.md"));

  await bucket.delete();

});
