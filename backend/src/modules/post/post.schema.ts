import { z } from "zod";

export const createPostSchema = z
  .object({
    title: z.string().min(1, "Post title can't be empty"),
    description: z
      .string()
      .min(10, "Post description must be atleast 10 characters long"),
  })
  .strict();

export const updatePostSchema = z
  .object({
    title: z.string().min(1, "Post title can't be empty").optional(),
    description: z
      .string()
      .min(10, "Post description must be atleast 10 characters long")
      .optional(),
  })
  .strict();

export type createPostDTO = z.infer<typeof createPostSchema>;
export type updatePostDTO = z.infer<typeof updatePostSchema>;
