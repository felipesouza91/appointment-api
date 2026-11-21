import { server } from "./http/server";

server.listen({ port: 3000, host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
  }
  console.log("Server is running");
});
