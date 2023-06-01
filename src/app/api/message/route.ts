import { ChatGPTMessage } from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";
import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";

export async function POST(req: Request, res: Response) {
  const { message } = await req.json();

  const parsedMessages = MessageArraySchema.parse(message);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });
}
