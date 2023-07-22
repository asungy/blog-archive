import { run as cli_run } from "./cli";
import { fileURLToPath } from "url";

const main = async () => {
  cli_run();
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
