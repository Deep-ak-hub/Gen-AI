import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import multer from "multer";
import ErrorHandler from "../middleware/error-handling.middleware.js";
import router from "./router.config.js";

const app = express();
const upload = multer();

app.use(cors());
const limiter = rateLimit({
  windowMs: 180000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
})

app.use(limiter)

app.use(helmet())

// Parser
app.use(
  express.json({
    limit: "5mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  }),
);

app.use(upload.none());

app.use("/api/v1", router);
// app.use('/api/v2',router)

// 404 error
app.use((req, res, next) => {
  next({
    error: null,
    message: "not found",
    status: "NOT_FOUND_ERR",
  });
});

app.use(ErrorHandler);

export default app;
