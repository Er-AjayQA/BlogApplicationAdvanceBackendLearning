import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config/config.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);

app.get("/api/v1/health-check", async (req: Request, res: Response) => {
  return res.status(200).json({
    code: 200,
    success: true,
    message: "Server is healthy",
  });
});
