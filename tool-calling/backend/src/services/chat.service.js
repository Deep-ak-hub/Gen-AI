import { searchClient } from "../config/app.config.js";

class ChatService {
  buildBaseMessages(userMessage) {
    return [
      {
        role: "system",
        content: `You are a helpful AI assistant.
            Rules:
            - Use webSearch only if needed
            - Do NOT call tools repeatedly if you already have enough information
            - After receiving tool results, give a final clear answer
            - Keep answers short and precise
            Current date and time: ${new Date().toUTCString()}
        `,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];
  }

  getToolDefinitions() {
    return [
      {
        type: "function",
        function: {
          name: "webSearch",
          description:
            "Search the latest information and realtime data on the internet",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to perform search on",
              },
            },
            required: ["query"],
          },
        },
      },
    ];
  }

  async webSearch({ query }) {
    const response = await searchClient.search(query);
    return response.results.map((result) => result.content).join("\n\n");
  }

  async processToolCalls(toolCalls, messages) {
    for (const tool of toolCalls) {
      const toolName = tool?.function?.name;

      if (!toolName || typeof this[toolName] !== "function") {
        continue;
      }

      const argumentsObject = JSON.parse(tool.function.arguments || "{}");
      const toolResult = await this[toolName](argumentsObject);

      messages.push({
        tool_call_id: tool.id,
        role: "tool",
        name: toolName,
        content: toolResult,
      });
    }
  }
}

export default new ChatService();
