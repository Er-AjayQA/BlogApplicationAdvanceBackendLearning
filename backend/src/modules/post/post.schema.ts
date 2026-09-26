import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Post title can't be empty"),
  description: z
    .string()
    .min(10, "Post description must be atleast 10 characters long"),
});

export type createPostSchemaDTO = z.infer<typeof createPostSchema>;
