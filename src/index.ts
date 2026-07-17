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
