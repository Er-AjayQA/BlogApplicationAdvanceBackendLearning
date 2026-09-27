import { Post } from "@prisma/client";
import { updatePostDTO } from "./post.schema.js";

export interface IPostRepository {
  createPost(
    userId: string,
    title: string,
    description: string,
    imageUrl?: string,
  ): Promise<Post>;

  getAllPosts(cursor?: string, limit?: number): Promise<Post[]>;
  getPostById(postId: string): Promise<Post | null>;
  getPostByPostIdAndUserId(
    userId: string,
    postId: string,
  ): Promise<Post | null>;
  getPostByUserId(userId: string): Promise<Post[]>;
  updatePost(
    postId: string,
    data: updatePostDTO,
    imageUrl?: string,
  ): Promise<Post>;
  deletePost(postId: string): Promise<void>;
}
