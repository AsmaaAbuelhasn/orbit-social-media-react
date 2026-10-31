
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .min(2, "at least 2 character")
    .max(18, "at most 18 character"),

  username: z.optional(z.string()),

 dateOfBirth: z.string()
  .pipe(z.coerce.date())
  .refine((value) => {
    return new Date().getFullYear() - value.getFullYear() >= 16;
  }, "age must be greater than or equal 16")
  .transform((date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  ),

  email: z.string().email("invalid email"),

  password: z.string().regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
    "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character."
  ),

  rePassword: z.string().regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
    "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and special character."
  ),

  gender: z.enum(["male", "female"], {
    message: "please choose a gender"
  })
}).refine(
  (data) => data.password === data.rePassword,
  {
    path: ["rePassword"],
    message: "not matches"
  }
);
