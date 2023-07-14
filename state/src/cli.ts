import { program } from "commander";

function example() {
  program
    .option("--first")
    .option("-s, --separator <char>");

  program.parse();

  const options = program.opts();
  const limit = options.first ? 1 : undefined;
  console.log(program.args[0].split(options.separator, limit));
}

export function run() {
  example();
}
