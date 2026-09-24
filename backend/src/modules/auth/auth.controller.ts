import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  },
);
