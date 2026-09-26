import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync.js";
import postService from "./post.container.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const createPostController = catchAsync(
  async (req: Request, res: Response) => {
    let result;

    if (req.file?.path) {
      result = await postService.createPost(
        req.userId as string,
        req.body,
        req.file.path,
      );
    } else {
      result = await postService.createPost(req.userId as string, req.body);
    }

    sendResponse(res, 201, {
      success: true,
      message: "Post created successfully",
      data: result,
    });
  },
);
