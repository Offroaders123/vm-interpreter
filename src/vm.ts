type Inst = "PUSH" | "ADD" | "MUL" | "PRINT" | "HALT";
export type Bytecode = (number | Inst)[];
type Stack = (number | Inst)[];

export function run(bytecode: Bytecode) {
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
      case "MUL":
        stack.push((stack.pop()! as number) * (stack.pop()! as number));
        break;
      case "PRINT":
        console.log(stack.pop());
        break;
      case "HALT":
        return;
    }
  }
}
