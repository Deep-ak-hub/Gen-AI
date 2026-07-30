import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const DbConfig = {
  mongodb: {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_NAME,
  },
};

const ResendConfig = {
  resendApiKey: process.env.RESEND_API_KEY,
  resendFROM: process.env.RESEND_FROM,
};

const AppConfig = {
  frontendURL: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,
};

const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
const searchClient = tavily(process.env.TAVILY_API_KEY);

export { DbConfig, ResendConfig, AppConfig, groqClient, searchClient };
