import { z } from "zod";

const emailSchema =  z.string().email({ message: "Invalid email address" });

export const signInSchema = z.object({
      email: emailSchema,
      password: z.string().min(1, {message: "Password is required"}),
      keepMeLoggedIn: z.boolean().default(false).optional(),
    });

export const signUpSchema = z.object({
  name: z.string()
  .trim()
  .refine(value => {
    const names = value.split(/\s+/);
    return names.length === 2 && names.every(name => name.length >= 2);
  }, {
    message: "Full name should include both first name and last name"
  }),
  phone: z.string().regex(/^(?:\+234|0)?(70|80|81|90|91)\d{8}$/, { message: "Invalid Nigerian phone number format" }),
  email: emailSchema,
  password: z.string().min(1, {message: "Password is required"}),
  keepMeLoggedIn: z.boolean().default(false).optional(),
})