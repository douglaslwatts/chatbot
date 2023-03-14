import { Router } from "express";
import ChatbotRouter from "./chatbot/ChatbotRouter";

class MainRouter {
  private _router = Router();
  private _chatbotRouter = ChatbotRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use("/chatbot", this._chatbotRouter);
  }
}

export = new MainRouter().router;
