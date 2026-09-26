import { prisma } from "../../lib/prisma.js";
import { IPostRepository } from "./post.interface.js";

export class PostRepository implements IPostRepository {
  async createPost(
    userId: string,
    title: string,
    description: string,
    imageUrl?: string,
  ) {
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
}
