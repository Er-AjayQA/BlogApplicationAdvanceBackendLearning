import { Comment } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { IcommentRepository } from "./comment.interface.js";
import { createCommentDTO } from "./comment.schema.js";

export class CommentRepository implements IcommentRepository {
  async createComment(
    userId: string,
    postId: string,
    data: createCommentDTO,
  ): Promise<Comment> {
    const newComment = await prisma.comment.create({
      data: {
        userId,
        postId,
        comment: data.comment,
      },
    });

    return newComment;
  }

  async getCommentsByPostId(
    postId: string,
    cursor?: string,
    limit: number = 10,
  ): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      where: { postId },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return comments;
  }

  async getCommentById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { post: true },
    });
    return comment;
  }

  async deleteComment(id: string): Promise<void> {
    await prisma.comment.delete({ where: { id } });
  }
}
