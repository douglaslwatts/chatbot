import express from "express";

import MainRouter from "./routers/MainRouter";

/** A server for the app to use */
class Server {
  /** The Express application for this server */
  private _app = express();

  /** The main router for this server which routes requests to the appropriate sub-router */
  private _router = MainRouter;

  /** Get the main router */
  get router() {
    return this._router;
  }

  /** Get the Express application */
  get app() {
    return this._app;
  }
}

/** Instantiate a Server object and make it available for import */
export = new Server();
