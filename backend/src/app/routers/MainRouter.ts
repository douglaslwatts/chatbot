import Router from "express";
import ChatbotRouter from "./chatbot/ChatbotRouter";

/** The main router for this application */
class MainRouter {
  /** The Express router for accepting requests */
  private _router = Router();

  /** A sub-router to use for chatbot questions */
  private _chatbotRouter = ChatbotRouter;

  /** Get the Express router */
  get router() {
    return this._router;
  }

  /** Construct and configure a MainRouter */
  constructor() {
    this._configure();
  }

  /** A helper to configure the MainRouter upon construction */
  private _configure() {
    this._router.use("/api", this._chatbotRouter);
  }
}

/** Instantiate a MainRouter and make its router available for import */
export = new MainRouter().router;
