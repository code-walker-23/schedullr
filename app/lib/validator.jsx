import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(20)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "username can only contain letters, numbers, and underscores"
    ),
});
