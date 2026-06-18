import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/* async function main() {
  const completion = await groq.chat.completions.create({
    // temperature:0.8 Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. Range 0 to 2
    // top_p: An alternative to sampling with temperature, called nucleus sampling,where the model considers the results of the tokens with top_p probability mass.So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both. Range 0 to 1.
    // stop: Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
    // Eg: stop: 'ga'  --------> negative = ne
    // max_completion_tokens: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
    // frequency_penalty: Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in thetext so far, decreasing the model's likelihood to repeat the same line verbatim.
    // presence_penalty: Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.

    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are Jarvis, a smart sentiment analyzer. Your task  is to analyze given review and return the sentiment. Classify the review as positive, negative or netral.",
      },
      {
        role: "user",
        content: `Review: These headphones arrived quickly and look great, but the left earcup stopped working after a week.
                  Sentiment:`,
      },
    ],
  });
  //   console.log(completion);
  console.log(completion.choices[0].message.content);
}

main(); */

// structured Output
// 1. Using Prompt Engineering (Basic Method)
/* async function structuredFunction() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are Jarvis, a smart sentiment analyzer. Your task  is to analyze given review and return the sentiment. Classify the review as positive, negative or netral. You must return the result in valid JSON structure.
        example: {"sentiment": "Negative"}
          `,
      },
      {
        role: "user",
        content: `Review: These headphones arrived quickly and look great, but the left earcup stopped working after a week.
          Sentiment:`,
      },
    ],
  });
  console.log(JSON.parse(completion.choices[0].message.content));
} */

  // 2. Using Response Format
  async function structuredFunction() {
  const completion = await groq.chat.completions.create({
    response_format: {type: 'json_object'},
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an interview grader assistant. Your task  is to generate candidate evaluation score. Output must be following JSON structure.
        {
            "confidence": number(1-10 scale),
            "accuracy": number(1-10 scale),
            "pass": boolean(true or false),
        }
        The response must:
            1. Include All fields shown above
            2. Use only the exact data types specified
            3. Follow the exact data types specified
            4. Contain ONLY the JSON object and nothing else 
          `,
      },
      {
        role: "user",
        content: `
          Q: What does = do in Javascript ?
          A: It checks strict equality-both value and type must match.

          Q: How do you create a promise that resolves after 1 second ?
          A: const = new Promise(r => setTimeout(r, 1000));

          Q:What is hoisiting ?
          A: Javascript moves declaration (but not initializations) to the top of their scope before code runs

          Q: Why use let instead of var?
          A: let is block-scoped, avoiding the function-scope quirks and re-declaration issues of var
        `,
      },
    ],
  });
  console.log(JSON.parse(completion.choices[0].message.content));
}
structuredFunction();
