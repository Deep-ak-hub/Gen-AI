import express from "express"
import chatController from "../controllers/chat.controller.js"

const chatRouter = express.Router()

chatRouter.post("/", chatController.generateAIResponse)
chatRouter.get("/", chatController.generateAIResponse)

export default chatRouter