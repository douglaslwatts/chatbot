import { Request, Response, NextFunction, urlencoded, json } from "express";
import ErrorHandler from "./handlers/ErrorHandler";
import dotenv from "dotenv";
import cors from "cors";

import Server from "./Server";

var corsOptions = {
  // TODO: further configuration is likely needed here
  origin: ["http://localhost:4200", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

/* load env vars from chatbot/backend/.env */
dotenv.config({
  path: ".env",
});

/* Use BodyParser.json() to parse the request and add the 'body' object to it */
const jsonParser = json();

/* Use extended as true to specify qs library, which has extra security and allows nested objects */
const urlEncodedOptions = {
  extended: true,

  // TODO: the below may be redundant as this is the default for BodyParser.json used above

  type: "application/json",
};

const urlEncoded = urlencoded(urlEncodedOptions);
const server = Server;

/* The port to listen on. Use 3050 if no env var is visible. */
const port = process.env.APP_PORT || 3050;

server.app.use(jsonParser);
server.app.use(urlEncoded);

/* Route requests to the server object's router */
server.app.use("/", cors(corsOptions), server.router);

/* Have express use the error handler. TODO: add more handlers for other possible errors */
server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: "Server side error...",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);

/* Start listening on the specified port */
server.app.listen(port, () => console.log(`Listening on port ${port}...`));
