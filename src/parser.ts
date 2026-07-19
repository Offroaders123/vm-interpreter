import { type AST, type BinaryExpression, type Number, type Print } from "./ast.ts";

export type Token =
  | NumberToken
  | IdentifierToken
  | PlusToken
  | StarToken
  | LParenToken
  | RParenToken;

export interface NumberToken {
  type: "NUMBER";
  value: number;
}

export interface IdentifierToken {
  type: "IDENTIFIER";
  value: string;
}

export interface PlusToken {
  type: "PLUS";
}

export interface StarToken {
  type: "STAR";
}

export interface LParenToken {
  type: "LPAREN";
}

export interface RParenToken {
  type: "RPAREN";
}

export function parse(tokens: Token[]): AST {
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

  function parseBinaryExpression(): BinaryExpression {
    let left: Number | BinaryExpression = parsePrimary() as Number;

    while (peek().type === "PLUS") {
      advance();

      const right: Number | BinaryExpression = parsePrimary() as Number;

      left = {
        type: "BinaryExpression",
        operator: "Add",
        left,
        right
      };

      return left;
    }

    while (peek().type === "STAR") {
      advance();

      const right: Number | BinaryExpression = parsePrimary() as Number;

      left = {
        type: "BinaryExpression",
        operator: "Multiply",
        left,
        right
      };

      return left;
    }

    throw new Error(`Unexpected operator ${peek().type}`);
  }

  function parsePrimary(): Number | BinaryExpression {
    const token = peek();

    if (token.type === "NUMBER") {
      return parseNumber();
    }

    if (token.type === "LPAREN") {
      advance(); // consume (

      const expression: BinaryExpression = parseBinaryExpression();

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

    const value: BinaryExpression = parseBinaryExpression();

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
