import { type AST, type Bytecode, compile, run } from "../src/index.ts";

const ast: AST = {
  type: "Print",
  value: {
    type: "BinaryExpression",
    operator: "Add",
    left: {
      type: "Number",
      value: 5
    },
    right: {
      type: "Number",
      value: 7
    }
  }
};

const code: Bytecode = [
  ...compile(ast),
  "HALT"
];

run(code);
