import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `You are a smart personal assistant who answer the asked questions.
           You have access to following tools:
           1. webSearch({query}: {query: string})  //Search the latest informatin and realtime data on the internet
          `,
      },
      {
        role: "user",
        content: `When was Samsung galaxy S26 launched ?`,
      },
    ],

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
  //   console.log(completion);
  //   console.log(completion.choices[0].message);
  //   console.log(JSON.stringify(completion.choices[0].message, null, 2));

  const toolCalls = completion.choices[0].message.tool_calls;

  if (!toolCalls) {
    console.log(`Assistant: ${completion.choices[0].message.content}`);
    return;
  }

  for (const tool of toolCalls) {
    console.log("tool:", tool);
    const functionName = tool.function.name;
    const functionArguments = tool.function.arguments;

    if (functionName === "webSearch") {
      const toolResult = await webSearch(JSON.parse(functionArguments));
      console.log("Tool Result: ", toolResult);
    }
  }
}

main();

async function webSearch({ query }) {
  console.log("Calling web search.....");

  return "Samsung galaxy s26 was launched on 2026";
}
