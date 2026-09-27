import { PostRepository } from "../post/post.repository.js";
import { CommentRepository } from "./comment.repository.js";
import { CommentService } from "./comment.service.js";

const commentRepository = new CommentRepository();
const postRepository = new PostRepository();
const commentService = new CommentService(commentRepository, postRepository);

export default commentService;
