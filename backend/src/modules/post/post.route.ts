import express from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { createPostController } from "./post.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import { authService } from "../auth/auth.container.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/create")
  .post(
    verifyUser(authService),
    upload.single("media"),
    validate(createPostSchema),
    createPostController,
  );

export default router;
