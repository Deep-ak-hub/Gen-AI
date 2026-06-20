import dotenv from "dotenv";
dotenv.config();

import readline from "node:readline/promises";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tavly = tavily(process.env.TAVILY_API_KEY);

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

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

  while (true) {
    const question = await rl.question("You: ");

    if (question === "bye") {
      break;
    }

    messages.push({
      role: "user",
      content: question,
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
                "Search the latest informatin and realtime data on the internet",
              parameters: {
                // JSON Schema object
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
      //   console.log(completion);
      //   console.log(completion.choices[0].message);

      // Check if model wants to call any tool
      const toolCalls = message.tool_calls;

      // If no tool is needed → model has final answer ===> exit conditon
      if (!toolCalls) {
        console.log(`Assistant: ${message.content}`);
        break;
      }

      // If model requested tool(s), execute them one by one
      for (const tool of toolCalls) {
        // console.log("tool:", tool);
        const functionName = tool.function.name;
        const functionArguments = tool.function.arguments;

        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(functionArguments));
          // console.log("Tool Result: ", toolResult);

          // Send tool result back to model
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

  rl.close();
}

main();

async function webSearch({ query }) {
  console.log("Calling web search.....");

  const response = await tavly.search(query);
  //   console.log("Response: ", response)

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");

  return finalResult;
}
