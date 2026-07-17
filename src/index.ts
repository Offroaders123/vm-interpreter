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
