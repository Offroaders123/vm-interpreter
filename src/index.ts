type Inst = "PUSH" | "ADD" | "PRINT" | "HALT";
type Bytecode = (number | Inst)[];
type Stack = (number | Inst)[];

function run(bytecode: Bytecode) {
  const stack: Stack = [];
  let ip: number = 0;

  while (true) {
    switch (bytecode[ip++]) {
      case "PUSH":
        stack.push(bytecode[ip++]!);
        break;
      case "ADD":
        stack.push((stack.pop()! as number) + (stack.pop()! as number));
        break;
      case "PRINT":
        console.log(stack.pop());
        break;
      case "HALT":
        return;
    }
  }
}

run([
  "PUSH", 5,
  "PUSH", 7,
  "ADD",
  "PRINT",
  "HALT"
]);

type AST = Number | Add | Print;

interface Number {
  type: "Number";
  value: number;
}

interface Add {
  type: "Add";
  left: Number;
  right: Number;
}

interface Print {
  type: "Print";
  value: Number | Add;
}

function compile(ast: AST): Bytecode {
  switch (ast.type) {
    case "Number":
      return ["PUSH", ast.value];

    case "Add":
      return [
        ...compile(ast.left),
        ...compile(ast.right),
        "ADD"
      ];

    case "Print":
      return [
        ...compile(ast.value),
        "PRINT"
      ];
  }
}

const ast: AST = {
  type: "Print",
  value: {
    type: "Add",
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

type Token =
  | NumberToken
  | IdentifierToken
  | PlusToken
  | LParenToken
  | RParenToken;

interface NumberToken {
  type: "NUMBER";
  value: number;
}

interface IdentifierToken {
  type: "IDENTIFIER";
  value: string;
}

interface PlusToken {
  type: "PLUS";
}

interface LParenToken {
  type: "LPAREN";
}

interface RParenToken {
  type: "RPAREN";
}

function parse(tokens: Token[]): AST {
  let position: number = 0;

  return parse();

  function peek(): Token {
    return tokens[position]!;
  }

  function advance(): Token {
    return tokens[position++]!;
  }

  function parseNumber(): Number {
    const token: Token = advance();

    return {
      type: "Number",
      value: (token as NumberToken).value
    };
  }

  function parseAdd(): Add {
    let left: Number | Add = parsePrimary() as Number;

    while (peek().type === "PLUS") {
      advance();

      const right: Number | Add = parsePrimary() as Number;

      left = {
        type: "Add",
        left,
        right
      };

      return left;
    }

    throw new Error("NEEDS HANDLING NOW 👹"); // temp
  }

  function parsePrimary(): Number | Add {
    const token = peek();

    if (token.type === "NUMBER") {
      return parseNumber();
    }

    if (token.type === "LPAREN") {
      advance(); // consume (

      const expression: Add = parseAdd();

      if (peek().type !== "RPAREN") {
        throw new Error("Expected ')'");
      }

      advance(); // consume )

      return expression;
    }

    throw new Error(`Unexpected token ${token.type}`);
  }

  function parsePrint(): Print {
    advance(); // consume "print"

    advance(); // consume (

    const value: Add = parseAdd();

    advance(); // consume )

    return {
      type: "Print",
      value
    };
  }

  function parse(): AST {
    const token: Token = peek();

    if (
      token.type === "IDENTIFIER" &&
      token.value === "print"
    ) {
      return parsePrint();
    }

    throw new Error("Expected statement");
  }
}

const tokens: Token[] = [
  { type: "IDENTIFIER", value: "print" },
  { type: "LPAREN" },
  { type: "NUMBER", value: 5 },
  { type: "PLUS" },
  { type: "NUMBER", value: 7 },
  { type: "RPAREN" }
];

run([...compile(parse(tokens)), "HALT"]);
