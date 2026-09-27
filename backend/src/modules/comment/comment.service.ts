import { AppError } from "../../utils/AppError.js";
import { IPostRepository } from "../post/post.interface.js";
import { IcommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentService {
  constructor(
    private commentRepo: IcommentRepository,
    private postRepo: IPostRepository,
  ) {}

  async createComment(userId: string, postId: string, data: createCommentDTO) {
    const post = await this.postRepo.getPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const newComment = await this.commentRepo.createComment(
      userId,
      postId,
      data,
    );

    return newComment;
  }

  async getCommentsByPostId(
    postId: string,
    cursor?: string,
    limit: number = 10,
  ) {
    const post = await this.postRepo.getPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    const comments = await this.commentRepo.getCommentsByPostId(
      postId,
      cursor,
      limit,
    );
    return comments;
  }

  async deleteComment(userId: string, commentId: string) {
    const comment = await this.commentRepo.getCommentById(commentId);

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    if (!(comment.userId === userId || comment.post.userId === userId)) {
      throw new AppError("Not authorized to delete this comment", 401);
    }

    await this.commentRepo.deleteComment(commentId);
    return true;
  }
}
