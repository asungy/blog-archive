import { program } from "commander";
import { example as s3_example } from "./s3";

function commander_example() {
  program
    .option("--first")
    .option("-s, --separator <char>");

  program.parse();

  const options = program.opts();
  const limit = options.first ? 1 : undefined;
  console.log(program.args[0].split(options.separator, limit));
}

export function run() {
  s3_example();
}
