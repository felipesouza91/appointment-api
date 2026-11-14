import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";

export const verifyToken = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  const tokenService = req.diScope.resolve("token");
  const tokenCookie = req.cookies.auth;

  const requestToken = req.headers.authorization?.substring(7);

  if (!requestToken && !tokenCookie) {
    throw new Error("Token not present");
  }

  const token = requestToken ? requestToken : tokenCookie;

  const decodedToken = tokenService.decode(token);

  if (!decodedToken) {
    throw new Error("Token invaid");
  }

  req.user = decodedToken.id;

  done();
};
