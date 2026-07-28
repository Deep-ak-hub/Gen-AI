import express from "express"

import authRouter from "../routes/auth.router.js";
import chatRouter from "../routes/chat.router.js"

const router = express.Router()

router.use("/auth", authRouter);
router.use("/chat", chatRouter)

export default router

