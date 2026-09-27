import { prisma } from "../../lib/prisma.js";
import { IcommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentRepository implements IcommentRepository {
  async createComment(userId: string, postId: string, data: createCommentDTO) {
    const newComment = await prisma.comment.create({
      data: {
        userId,
        postId,
        comment: data.comment,
      },
    });

    return newComment;
  }

  async getCommentById(id: string) {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { post: true },
    });
    return comment;
  }

  async deleteComment(id: string) {
    await prisma.comment.delete({ where: { id } });
    return true;
  }
}
