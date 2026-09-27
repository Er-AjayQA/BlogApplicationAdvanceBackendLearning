import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import {
  createPostController,
  getUserPostsController,
  updatePostController,
  deletePostController,
  getAllPosts,
  getPostByIdController,
} from "./post.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").get(verifyUser, getAllPosts);
router.route("/:id").get(verifyUser, getPostByIdController);

router
  .route("/create")
  .post(
    verifyUser,
    upload.single("media"),
    validate(createPostSchema),
    createPostController,
  );

router.route("/my-posts").get(verifyUser, getUserPostsController);

router
  .route("/:id")
  .patch(
    verifyUser,
    upload.single("media"),
    validate(updatePostSchema),
    updatePostController,
  );

router.route("/:id").delete(verifyUser, deletePostController);

export default router;
