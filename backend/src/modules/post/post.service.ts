import { uploadToCloudinary } from "../../utils/cloudinary.helper.js";
import { IPostRepository } from "./post.interface.js";
import { createPostSchemaDTO } from "./post.schema.js";

export class PostService {
  constructor(private repo: IPostRepository) {}

  async createPost(
    userId: string,
    body: createPostSchemaDTO,
    localFilePath?: string,
  ) {
    const { title, description } = body;
    let createdPost;

    if (localFilePath) {
      const imageUrl = await uploadToCloudinary(localFilePath);
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
}
