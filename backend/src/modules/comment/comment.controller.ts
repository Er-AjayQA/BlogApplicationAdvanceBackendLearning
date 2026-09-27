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
