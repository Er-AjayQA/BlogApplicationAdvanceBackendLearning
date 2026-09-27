import { createCommentDTO } from "./comment.schema.js";

export interface IcommentRepository {
  createComment(
    userId: string,
    postId: string,
    data: createCommentDTO,
  ): Promise<any>;

  getCommentById(id: string): Promise<any>;
  deleteComment(id: string): Promise<any>;
}
