import express from "express";
import cors from "cors"
import { generateAIResponse } from "./chatbot.js";

const app = express();

app.use(cors())

app.use(express.json())

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/chat", async(req,res) => {
    const {message} = req.body
    console.log("message: ", message);

    const result= await generateAIResponse(message)
    res.json({message: result})

    
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});