import { groqClient, searchClient } from "../config/app.config.js";
import chatService from "../services/chat.service.js";

class ChatController {
  extractUserMessage = (req) => {
    if (typeof req?.body === "string") {
      return req.body;
    }

    if (req?.body?.message) {
      return req.body.message;
    }

    if (req?.body?.input) {
      return req.body.input;
    }

    if (req?.query?.message) {
      return req.query.message;
    }

    return null;
  }

  generateAIResponse = async (req, res, next) => {
    try {
      const userMessage = this.extractUserMessage(req);

      if (!userMessage || typeof userMessage !== "string") {
        return res.status(400).json({
          message: "Invalid user message",
          status: "BAD_REQUEST",
        });
      }

      if (!groqClient || !searchClient) {
        return next(new Error("Missing required API keys"));
      }

      const messages = await chatService.buildBaseMessages(userMessage);

      const MAX_TOOL_ITERATIONS = 8
      let iterations = 0

      while (iterations < MAX_TOOL_ITERATIONS) {
        const completion = await groqClient.chat.completions.create({
          model: "llama-3.1-8b-instant",
          temperature: 0,
          messages,
          tools: chatService.getToolDefinitions(),
          tool_choice: "auto",
        });

        const message = completion.choices?.[0]?.message;
        if (!message) {
          return next(new Error("No response from AI model"));
        }

        messages.push(message);
        const toolCalls = message.tool_calls;

        if (!toolCalls || toolCalls.length === 0) {
          const assistantReply =
            typeof message.content === "string"
              ? message.content
              : JSON.stringify(message.content);

          return res.status(200).json({
            data: assistantReply,
            message: assistantReply,
            status: "OK",
          });
        }

        await chatService.processToolCalls(toolCalls, messages);
      }
    } catch (error) {
      next(error);
    }
  }
}

const chatController = new ChatController();
export default chatController;