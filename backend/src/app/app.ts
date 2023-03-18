import { Request, Response, NextFunction, urlencoded, json } from "express";
import ErrorHandler from "./handlers/ErrorHandler";
import dotenv from "dotenv";

import Server from "./Server";

// load environment vars

dotenv.config({
  path: ".env",
});

const jsonParser = json();

const urlEncodedOptions = {
  extended: true,
  type: "application/json",
};

const urlEncoded = urlencoded(urlEncodedOptions);
const server = Server;
const port = process.env.APP_PORT || 5555;

server.app.use(jsonParser);
server.app.use(urlEncoded);

server.app.use("/", server.router);

server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: "Server side error...",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);

server.app.listen(port, () => console.log(`Backend listening on port ${port}`));
