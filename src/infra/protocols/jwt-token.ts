import type { Token, TokenData } from "@src/domain/protocols/token";
import { TokenError } from "@src/http/errors/dto/token-error";
import jwt from "jsonwebtoken";
import { appEnv } from "../config/env";

export class JwtToken implements Token {
  sing(body: any): string {
    return jwt.sign(body, appEnv.TOKEN_SECRET, {
      expiresIn: appEnv.TOKEN_EXPIRATION_TIME,
    });
  }

  decode(token: any): TokenData | undefined {
    try {
      const result = jwt.verify(token, appEnv.TOKEN_SECRET);
      if (typeof result === "string") {
        return undefined;
      }
      return result;
    } catch (error) {
      throw new TokenError("Token erro validations");
    }
  }
}
