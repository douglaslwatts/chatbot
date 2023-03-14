import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-gUPII1EKc0bwnruIoppgwND6",
  apiKey: process.env.OPENAI_API_KEY,
});

const openAi = new OpenAIApi(configuration);

let training_messages: ChatCompletionRequestMessage[] = [
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

class ChatbotController {
  async askChatbot(question: string) {
    if (question) {
      training_messages.push({ role: "user", content: question });
      const openAiResponse = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: training_messages,
      });

      const answer = openAiResponse.data.choices[0].message?.content;
      return answer;
    } else {
      return "No response from empty question!";
    }
  }
}

async function testIt() {
  console.log(
    await new ChatbotController().askChatbot(
      "What is the diameter of the earth?"
    )
  );
}

testIt();

export = new ChatbotController();
