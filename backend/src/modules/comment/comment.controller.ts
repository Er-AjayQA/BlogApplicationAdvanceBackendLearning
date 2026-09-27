import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import commentService from "./comment.container.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.postId as string;

    const result = await commentService.createComment(
      req.userId as string,
      postId,
      req.body,
    );

    sendResponse(res, 201, {
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  },
);

export const getCommentsByPostIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { cursor, limit } = req.query;
    const parsedLimit = limit ? parseInt(limit as string) : 10;
    const postId = req.params.postId as string;

    const result = await commentService.getCommentsByPostId(
      postId,
      cursor as string,
      parsedLimit,
    );

    sendResponse(res, 200, {
      success: true,
      message: "Post comments fetched successfully",
      data: {
        result,
        meta: {
          nextCursor: result.length > 0 ? result[result.length - 1].id : null,
        },
      },
    });
  },
);

export const deleteCommentController = catchAsync(
  async (req: Request, res: Response) => {
    const commentId = req.params.id as string;
    const result = await commentService.deleteComment(
      req.userId as string,
      commentId,
    );

    sendResponse(res, 201, {
      success: true,
      message: "Comment deleted successfully",
    });
  },
);
