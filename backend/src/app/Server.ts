import express from "express";

import MainRouter from "./routers/MainRouter";

class Server {
  private _app = express();
  private _router = MainRouter;

  get router() {
    return this._router;
  }

  get app() {
    return this._app;
  }
}

export = new Server();
