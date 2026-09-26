import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { IJwtPayload } from "../types/index.js";
import { AuthService } from "../modules/auth/auth.service.js";

export const verifyUser =
  (authService: AuthService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new AppError("Unauthorized request", 401);
      }

      const decoded = verifyAccessToken(token) as IJwtPayload;

      const userData = await authService.getCurrentUser(decoded.userId);

      if (!userData?.user) {
        throw new AppError("Unauthorized request", 401);
      }

      // req.userId = decoded.userId;
      req.userId = userData.user.id;
      next();
    } catch (error) {
      next(new AppError("Invalid or expired token", 401));
    }
  };
