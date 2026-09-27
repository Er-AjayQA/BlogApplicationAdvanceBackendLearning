import { Comment } from "@prisma/client";
import { createCommentDTO } from "./comment.schema.js";

export interface IcommentRepository {
  createComment(
    userId: string,
    postId: string,
    data: createCommentDTO,
  ): Promise<Comment>;

  getCommentsByPostId(
    postId: string,
    cursor?: string,
    limit?: number,
  ): Promise<Comment[]>;
  getCommentById(id: string): Promise<any>;
  deleteComment(id: string): Promise<void>;
}
