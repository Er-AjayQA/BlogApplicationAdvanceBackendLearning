import { Post } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";
import { updatePostDTO } from "./post.schema.js";

export class PostRepository implements IPostRepository {
  async createPost(
    userId: string,
    title: string,
    description: string,
    imageUrl?: string,
  ): Promise<Post> {
    let createdPost;
    if (imageUrl) {
      createdPost = await prisma.post.create({
        data: { title, description, imageUrl, userId },
      });
    } else {
      createdPost = await prisma.post.create({
        data: { title, description, userId },
      });
    }

    return createdPost;
  }

  async getAllPosts(cursor?: string, limit: number = 10): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });
    return posts;
  }

  async getPostById(postId: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        comment: true,
      },
    });
    return post;
  }

  async getPostByPostIdAndUserId(
    userId: string,
    postId: string,
  ): Promise<Post | null> {
    const post = await prisma.post.findFirst({
      where: { id: postId, userId },
      include: {
        user: true,
        comment: true,
      },
    });

    return post;
  }

  async getPostByUserId(userId: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({ where: { userId } });

    return posts;
  }

  async updatePost(
    postId: string,
    data: updatePostDTO,
    imageUrl?: string,
  ): Promise<Post> {
    let updatedPost;

    if (imageUrl) {
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: data.title,
          description: data.description,
          imageUrl,
        },
      });
    } else {
      updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: data.title,
          description: data.description,
        },
      });
    }

    return updatedPost;
  }

  async deletePost(postId: string): Promise<void> {
    await prisma.post.delete({ where: { id: postId } });
  }
}
