import { Server, Socket } from "socket.io";
import http from "http";

const createServer = (server: http.Server) => {
  const io = new Server(server, {
    // ...
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  //   io.use(cookieParser());
  //   // @ts-ignore
  //   io.use(authenticateUser);
  io.on("connection", (socket: Socket) => {
    socket.emit("connection", { status: "connected" });
    socket.on("setId", async (id) => {});
  });
};

export default createServer;
