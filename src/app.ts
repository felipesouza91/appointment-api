import { server } from "./http/server";
import { appEnv } from "./infra/config/env";

server.listen({ port: appEnv.PORT, host: "0.0.0.0" }, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`Server is running on port ${appEnv.PORT}`);
});
