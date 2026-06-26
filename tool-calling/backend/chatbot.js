import dotenv from "dotenv";
dotenv.config();

import readline from "node:readline/promises";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tavly = tavily(process.env.TAVILY_API_KEY);

export async function generateAIResponse(userMessage) {
  // This array stores the entire conversation (memory of the agent)
  const messages = [
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
    /* {
      role: "user",
      content: `When was Iphone 16 launched ?`,
    }, */
  ];

    messages.push({
      role: "user",
      content: userMessage,
    });

    // Infinite loop → allows multi-step reasoning (agent behavior)
    while (true) {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0,
        messages: messages,

        tools: [
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
        ],
        tool_choice: "auto",
      });

      // Extract model response
      const message = completion.choices[0].message;

      // Save response into memory
      messages.push(message);

      const toolCalls = message.tool_calls;

      if (!toolCalls) {
        return message.content;
      }

      for (const tool of toolCalls) {
        const functionName = tool.function.name;
        const functionArguments = tool.function.arguments;

        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(functionArguments));

          messages.push({
            tool_call_id: tool.id,
            role: "tool",
            name: functionName,
            content: toolResult,
          });
        }
      }
    }
  }


async function webSearch({ query }) {
  console.log("Calling web search.....");

  const response = await tavly.search(query);
  //   console.log("Response: ", response)

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");

  return finalResult;
}
