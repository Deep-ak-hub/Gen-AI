import dotenv from "dotenv";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

import http from "http";
import { mongoDbInit } from "./src/config/mongodb.config.js";
import app from "./src/config/express.config.js";

const server = http.createServer(app);

const HOST = "127.0.0.1";
const PORT = process.env.PORT || 3000;

(async () => {
  try { 
    await mongoDbInit(); 
    
    server.listen(PORT, HOST, () => { 
      console.log(`🚀 Server is running on http://${HOST}:${PORT}`); 
      console.log(`Press CTRL C to disconnect the server....`); 
    }); 

    // Handle port/binding errors explicitly
    server.on("error", (error) => {
      console.error("Server failed to start:", error.message);
      process.exit(1);
    });
    
  } catch (exception) { 
    console.error("Database connection or initialization failed:", exception); 
    process.exit(1); 
  }
})();

