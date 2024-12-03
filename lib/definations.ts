import { z } from "zod";

export const formSchema = z
  .object({
    Name: z.string().min(3, "Name must be atleast 3 characters long"),
    Email: z.string().email("Invalid email address"),
    ContactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits")
      .max(15, "Contact number must be at most 15 digits"),
    Address: z.string().min(5, "Address is required"),
    Password: z.string().min(6, "Password must be at least 6 characters long"),
    ConfirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

export interface IUser extends Document {
  name: string;
  email: string;
  ContactNumber?: string;
  Address?: string;
  Password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisterUserType {
  name: string;
  email: string;
  ContactNumber?: string;
  Address?: string;
  Password?: string;
}
