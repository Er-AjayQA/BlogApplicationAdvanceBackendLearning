import { PostRepository } from "./post.repository.js";
import { PostService } from "./post.service.js";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);

export default postService;
