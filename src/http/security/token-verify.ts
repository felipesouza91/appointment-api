import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { TokenError } from "../errors/dto/token-error";

export const verifyToken = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  const tokenService = req.diScope.resolve("token");
  const tokenCookie = req.cookies.auth;

  const requestToken = req.headers.authorization?.substring(7);

  if (!requestToken && !tokenCookie) {
    throw new TokenError("Token not present");
  }

  const token = requestToken ? requestToken : tokenCookie;

  const decodedToken = tokenService.decode(token);

  if (!decodedToken) {
    throw new TokenError("Token invaid");
  }

  req.user = decodedToken.id;

  done();
};
