import type { Token } from "@src/domain/protocols/token";
import jwt from "jsonwebtoken";
import { appEnv } from "../config/env";

export class JwtToken implements Token {
  sing(body: any): string {
    return jwt.sign(body, appEnv.TOKEN_SECRET, {
      expiresIn: appEnv.TOKEN_EXPIRATION_TIME,
    });
  }
}
