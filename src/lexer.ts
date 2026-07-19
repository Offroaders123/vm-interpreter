import { type IdentifierToken, type NumberToken, type Token } from "./parser.ts";

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let position: number = 0;

  function current(): string {
    return source[position]!;
  }

  function advance(): string {
    return source[position++]!;
  }

  function readNumber(): NumberToken {
    let value: string = "";

    while (
      position < source.length &&
      isDigit(current())
    ) {
      value += advance();
    }

    return {
      type: "NUMBER",
      value: Number(value)
    };
  }

  function readIdentifier(): IdentifierToken {
    let value: string = "";

    while (
      position < source.length &&
      isLetter(current())
    ) {
      value += advance();
    }

    return {
      type: "IDENTIFIER",
      value
    };
  }

  function isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  function isLetter(char: string): boolean {
    return (
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z")
    );
  }

  while (position < source.length) {
    const char: string = current();

    if (char === " ") {
      advance();
      continue;
    }

    if (isDigit(char)) {
      tokens.push(readNumber());
      continue;
    }

    if (isLetter(char)) {
      tokens.push(readIdentifier());
      continue;
    }

    switch (char) {
      case "+":
        tokens.push({ type: "PLUS" });
        advance();
        break;

      case "*":
        tokens.push({ type: "STAR" });
        advance();
        break;

      case "(":
        tokens.push({ type: "LPAREN" });
        advance();
        break;

      case ")":
        tokens.push({ type: "RPAREN" });
        advance();
        break;

      default:
        throw new Error(`Unknown character: ${char}`);
    }
  }

  return tokens;
}
