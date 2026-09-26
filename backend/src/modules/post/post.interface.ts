import { updatePostDTO } from "./post.schema.js";

export interface IPostRepository {
  createPost(
    userId: string,
    title: string,
    description: string,
    imageUrl?: string,
  ): Promise<any>;

  getAllPosts(): Promise<any>;
  getPostByPostIdAndUserId(userId: string, postId: string): Promise<any>;
  getPostByUserId(userId: string): Promise<any>;
  updatePost(
    postId: string,
    data: updatePostDTO,
    imageUrl?: string,
  ): Promise<any>;
  deletePost(postId: string): Promise<any>;
}
