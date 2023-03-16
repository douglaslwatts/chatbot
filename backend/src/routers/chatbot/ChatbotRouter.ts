import { Request, Response, NextFunction, Router } from "express";
import ChatbotController from "../../controllers/chatbot/ChatbotController";

class ChatbotRouter {
  private _router = Router();
  private _controller = ChatbotController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.get(
      "/",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          let question = req.body.question;
          const result = await this._controller.askChatbot(question);
          res.status(200).json(result);
        } catch (err) {
          next(err);
        }
      }
    );
  }
}

export = new ChatbotRouter().router;
