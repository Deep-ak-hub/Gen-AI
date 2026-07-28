import dotenv from "dotenv";
dotenv.config();

const DbConfig = {
  mongodb: {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_NAME,
  }
};

const ResendConfig = {
  resendApiKey: process.env.RESEND_API_KEY,
  resendFROM: process.env.RESEND_FROM,
};

const AppConfig = {
  frontendURL: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,
};


export {
  DbConfig,
  ResendConfig,
  AppConfig,
};
