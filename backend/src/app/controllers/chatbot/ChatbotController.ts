import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

class ChatbotController {
  private configuration = new Configuration({
    organization: "org-gUPII1EKc0bwnruIoppgwND6",
    apiKey: process.env.OPENAI_API_KEY,
  });

  private openAi = new OpenAIApi(this.configuration);

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

export = new ChatbotController();
