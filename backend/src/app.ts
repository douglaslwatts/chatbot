import dotenv from "dotenv";
import express from "express";
import { Request, Response, NextFunction } from "express";

import MainRouter from "./routers/MainRouter";
import ErrorHandler from "./handlers/ErrorHandler";

// load environment vars

dotenv.config({
  path: ".env",
});

class Server {
  public app = express();
  public router = MainRouter;
}

const server = new Server();

server.app.use("/api", server.router);

server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);

const port = process.env.APP_PORT || 5555;
server.app.listen(port, () => console.log(`Backend listening on port ${port}`));
