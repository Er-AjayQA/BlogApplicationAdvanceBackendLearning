import { z } from "zod";

export const registerUserSchema = z
  .object({
    username: z.string().min(3, "Username must be atleast 3 characters long"),
    email: z.email("Email is required"),
    password: z.string().min(6, "Password must be atleast 6 character long"),
  })
  .strict();

export const loginUserSchema = z
  .object({
    email: z.email("Email is required"),
    password: z.string("Password is required"),
  })
  .strict();

export const refreshTokenSchema = z
  .object({
    token: z.string(),
  })
  .strict();

export type registerUserDTO = z.infer<typeof registerUserSchema>;
export type loginUserDTO = z.infer<typeof loginUserSchema>;
export type refreshTokenDTO = z.infer<typeof refreshTokenSchema>;
