import express from "express";
import { env } from "custom-env";
import mongoose from "mongoose";
import { servicesVersion } from "typescript";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./api";
import error_handler from "node-error-handler";
import createReadisClient from "./Libs/redis";
import JWTR from "jwt-redis";
import passport from "passport";
import "./api/v1/helpers/oauth/strategies/google";
import "./api/v1/helpers/oauth/strategies/facebook";
import "./api/v1/helpers/oauth/strategies/zoom";
import http from "http";
import socketServer from "./api/v1/socket";

import config from "./Config";

const server = express();
const httpServer = http.createServer(server);

//set up the right .evn file
const environment = process.env.NODE_ENV;
env(environment);

//server and port
const PORT = config.PORT;

//connect to redis
const { REDIS_PORT, REDIS_HOST, REDIS_PASS } = process.env!;
const redisClient = createReadisClient(
  Number(REDIS_PORT),
  REDIS_HOST!,
  REDIS_PASS!
);

//initialize jwtr
export const jwtr = new JWTR(redisClient);

////////////////////////////////
//MIDDLEWARES
server.use(express.json());
//cors
const whiteList = [config.FE_URI!, "http://localhost:3000"];
server.use(
  cors({
    origin: whiteList,
    credentials: true,
  })
);
//cookie parser
server.use(cookieParser());
//passport
server.use(passport.initialize());

//////////////////////////
//ROUTES
server.use("/api", apiRoutes);

//ERROR HANDLER
server.use(error_handler({ log: true, debug: true }));

const socket = socketServer(httpServer);

//connect to server and db
mongoose
  .connect(config.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    redisClient.on("connect", function () {
      console.error("connected");
    });
    httpServer.listen(PORT, () => console.log(`connected to ${PORT}`));
  });
