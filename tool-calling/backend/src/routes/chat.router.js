import express from "express"
import chatController from "../controllers/chat.controller.js"

const chatRouter = express.Router()

chatRouter.get("/", chatController.generateChat)

export default chatRouter