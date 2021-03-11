import express from "express";
import { env } from "custom-env";
import mongoose from "mongoose";
import { servicesVersion } from "typescript";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoutes from "./api";
import error_handler from "node-error-handler";
const server = express();

//set up the right .evn file
const environment = process.env.NODE_ENV;
env(environment);

//server and port
const PORT = process.env.PORT;

//MIDDLEWARES
server.use(express.json());
//cors
const whiteList = [process.env.FRONT_URI!];
server.use(
  cors({
    origin: whiteList,
    credentials: true,
  })
);
//cookie parser
server.use(cookieParser());

//ROUTES
server.use("/api", apiRoutes);

//ERROR HANDLER
server.use(error_handler({ log: true, debug: true }));

//connect to server and db
mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () =>
      console.log(`connected to ${PORT} in ${environment} env`)
    );
  });
