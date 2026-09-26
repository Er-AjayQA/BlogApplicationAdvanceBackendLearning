import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import {
  createPostController,
  getUserPostsController,
  updatePostController,
  deletePostController,
  getAllPosts,
} from "./post.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").get(verifyUser(authService), getAllPosts);

router
  .route("/create")
  .post(
    verifyUser(authService),
    upload.single("media"),
    validate(createPostSchema),
    createPostController,
  );

router.route("/my-posts").get(verifyUser(authService), getUserPostsController);

router
  .route("/:id")
  .patch(
    verifyUser(authService),
    upload.single("media"),
    validate(updatePostSchema),
    updatePostController,
  );

router.route("/:id").delete(verifyUser(authService), deletePostController);

export default router;
