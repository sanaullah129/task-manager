import envConfig from "./config/envConfig";
import { Server } from "./Server";

const server = new Server(envConfig);
server.bootstrap();
server.run();