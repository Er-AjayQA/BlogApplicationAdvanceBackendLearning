import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    sendResponse(res, 201, {
      success: true,
      message: "Account created successfully",
      data: result,
    });
  },
);

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);

    sendResponse(res, 200, {
      success: true,
      message: "Logged in successfully",
      data: result,
    });
  },
);

export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.refreshToken(req.body);

    sendResponse(res, 202, {
      success: true,
      message: "Tokens refreshed successfully",
      data: result,
    });
  },
);

export const currentUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.getCurrentUser(req.userId as string);

    sendResponse(res, 200, {
      success: true,
      message: "User detail fetched successfully",
      data: result,
    });
  },
);

export const logoutController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);

    sendResponse(res, 200, {
      success: true,
      message: "Logged out successfully",
    });
  },
);

export const logoutAllController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.logoutAllDevices(req.userId as string);

    sendResponse(res, 200, {
      success: true,
      message: "Logged out of all devices",
    });
  },
);
