import { z } from "zod";

export const createCommentSchema = z
  .object({
    comment: z.string().min(1, "Comment must be atleast 1 character"),
  })
  .strict();

export type createCommentDTO = z.infer<typeof createCommentSchema>;
