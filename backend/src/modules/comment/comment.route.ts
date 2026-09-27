import express from "express";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";
import {
  createCommentController,
  deleteCommentController,
} from "./comment.controller.js";

const router = express.Router();

router
  .route("/create/post/:postId")
  .post(
    verifyUser(authService),
    validate(createCommentSchema),
    createCommentController,
  );

router
  .route("/delete/:id")
  .delete(verifyUser(authService), deleteCommentController);

export default router;
