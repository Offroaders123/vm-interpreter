// VM

run([
  "PUSH", 5,
  "PUSH", 7,
  "ADD",
  "PRINT",
  "HALT"
]);

// AST

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

// Parser

const tokens: Token[] = [
  { type: "IDENTIFIER", value: "print" },
  { type: "LPAREN" },
  { type: "NUMBER", value: 5 },
  { type: "PLUS" },
  { type: "NUMBER", value: 7 },
  { type: "RPAREN" }
];

run([...compile(parse(tokens)), "HALT"]);

// Lexer

const source: string = "print(5 + 7)";

run([...compile(parse(tokenize(source))), "HALT"]);

run([...compile(parse(tokenize("print(3 * 3)"))), "HALT"]);
