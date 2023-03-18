import { Request, Response, NextFunction, Router } from "express";
import ChatbotController from "../../controllers/chatbot/ChatbotController";

/** A chatbot router to handle POST requests with questions for chatbot. */
class ChatbotRouter {
  /** Express router for accepting POST requests */
  private _router = Router();

  /** The controller which asks the question for this router */
  private _controller = ChatbotController;

  /** Get the router from this ChatbotRouter */
  get router() {
    return this._router;
  }

  /** Build and configure a ChatbotRouter */
  constructor() {
    this._configure();
  }

  /** A helper to configure the ChatbotRouter upon construction */
  private _configure() {
    this._router.post(
      "/chatbot",
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

/** Instantiate a ChatbotRouter and make its router available for import */
export = new ChatbotRouter().router;
