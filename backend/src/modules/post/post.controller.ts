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

export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAllPosts();

  sendResponse(res, 200, {
    success: true,
    message: "Get all posts successfully",
    data: result,
  });
});

export const getUserPostsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await postService.getUserPosts(req.userId as string);

    sendResponse(res, 200, {
      success: true,
      message: "Get user posts successfully",
      data: result,
    });
  },
);

export const updatePostController = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;
    let result;

    if (req.file?.path) {
      result = await postService.updatePost(
        postId,
        req.userId as string,
        req.body,
        req.file?.path,
      );
    } else {
      result = await postService.updatePost(
        postId,
        req.userId as string,
        req.body,
      );
    }

    sendResponse(res, 201, {
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  },
);

export const deletePostController = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.id as string;

    const result = await postService.deletePost(postId, req.userId as string);

    sendResponse(res, 200, {
      success: true,
      message: "Post deleted successfully",
      data: result,
    });
  },
);
