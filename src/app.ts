import { server } from "./http/server";

server.listen({ port: 3000 }, () => {
  console.log("Server is running");
});
