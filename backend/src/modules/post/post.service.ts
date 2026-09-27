import { AppError } from "../../utils/AppError.js";
import {
  removeFromCloudinary,
  uploadToCloudinary,
} from "../../utils/cloudinary.helper.js";
import { IFileService } from "../../utils/file.interface.js";
import { IPostRepository } from "./post.interface.js";
import { createPostDTO, updatePostDTO } from "./post.schema.js";

export class PostService {
  constructor(
    private repo: IPostRepository,
    private fileService: IFileService,
  ) {}

  async createPost(
    userId: string,
    body: createPostDTO,
    localFilePath?: string,
  ) {
    const { title, description } = body;
    let createdPost;

    if (localFilePath) {
      const imageUrl = await this.fileService.upload(localFilePath);
      createdPost = await this.repo.createPost(
        userId,
        title,
        description,
        imageUrl,
      );
    } else {
      createdPost = await this.repo.createPost(userId, title, description);
    }

    return createdPost;
  }

  async getAllPosts(cursor?: string, limit?: number) {
    const posts = await this.repo.getAllPosts(cursor, limit);
    return posts;
  }

  async getPostById(postId: string) {
    const post = await this.repo.getPostById(postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return post;
  }

  async getUserPosts(userId: string) {
    const posts = await this.repo.getPostByUserId(userId);

    return posts;
  }

  async updatePost(
    postId: string,
    userId: string,
    body: updatePostDTO,
    localFilePath?: string,
  ) {
    const post = await this.repo.getPostByPostIdAndUserId(userId, postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    let updatedPost;

    if (localFilePath) {
      const imageUrl = await this.fileService.upload(localFilePath);
      updatedPost = await this.repo.updatePost(postId, body, imageUrl);
    } else {
      updatedPost = await this.repo.updatePost(postId, body);
    }

    return post;
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.repo.getPostByPostIdAndUserId(userId, postId);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.imageUrl) {
      await this.fileService.remove(post.imageUrl);
    }

    await this.repo.deletePost(postId);
    return true;
  }
}
