import { compile, parse, run, tokenize } from "../src/index.ts";

const source: string = "print(5 + 7)";

run([...compile(parse(tokenize(source))), "HALT"]);

run([...compile(parse(tokenize("print(3 * 3)"))), "HALT"]);
