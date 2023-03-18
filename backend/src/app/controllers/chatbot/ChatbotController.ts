import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

/** A controller for relaying questions to the chatbot and providing its answers. */
class ChatbotController {
  /** Configuration for OpenAI to specify the organization and API key */
  private configuration = new Configuration({
    organization: "org-gUPII1EKc0bwnruIoppgwND6",
    apiKey: process.env.OPENAI_API_KEY,
  });

  /** The OpenAI object for creating completions */
  private openAi = new OpenAIApi(this.configuration);

  /** A small set of instructions to give the chatbot some initial context */
  private training_messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        " You are a helpful assistant answering questions about life and the universe",
    },
    { role: "user", content: " What is the diameter of jupiter?" },
    {
      role: "assistant",
      content:
        " The diameter of Jupiter, the largest planet in our Solar System, is approximately 86,881 miles (139,822 kilometers).",
    },
  ];

  /**
   * Asks and OpenAI chatbot a question.
   *
   * @param question The question to ask
   *
   * @returns {Object {answer: string}} The answer for the question
   */
  public askChatbot = async (question: string) => {
    if (question) {
      this.training_messages.push({ role: "user", content: question });
      const openAiResponse = await this.openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: this.training_messages,
      });

      const answer = openAiResponse.data.choices[0].message?.content;
      return { answer: answer };
    } else {
      return "No response from empty question!";
    }
  };
}

/** Instantiate a ChatbotController and make it available for import */
export = new ChatbotController();
