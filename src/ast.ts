export type AST = Expression | Print;

type Expression = Number | BinaryExpression;

interface Number {
  type: "Number";
  value: number;
}

interface BinaryExpression {
  type: "BinaryExpression";
  operator: "Add" | "Multiply";
  left: Number;
  right: Number;
}

interface Print {
  type: "Print";
  value: Number | BinaryExpression;
}

export function compile(ast: AST): Bytecode {
  switch (ast.type) {
    case "Number":
      return ["PUSH", ast.value];

    case "BinaryExpression":
      switch (ast.operator) {
        case "Add":
          return [
            ...compile(ast.left),
            ...compile(ast.right),
            "ADD"
          ];

        case "Multiply":
          return [
            ...compile(ast.left),
            ...compile(ast.right),
            "MUL"
          ];
      }

    case "Print":
      return [
        ...compile(ast.value),
        "PRINT"
      ];
  }
}
