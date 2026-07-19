import { compile, parse, run, type Token } from "../src/index.ts";

const tokens: Token[] = [
  { type: "IDENTIFIER", value: "print" },
  { type: "LPAREN" },
  { type: "NUMBER", value: 5 },
  { type: "PLUS" },
  { type: "NUMBER", value: 7 },
  { type: "RPAREN" }
];

run([...compile(parse(tokens)), "HALT"]);
