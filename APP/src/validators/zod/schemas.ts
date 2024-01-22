import {z} from 'zod';

export const emailSchema = z
  .string()
  .email('Invalid email format');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long and contain at least one alphabet character and digit')
  .regex(/(?=.*[a-zA-Z])(?=.*\d)/, 'Password must be at least 8 characters long and contain at least one alphabet character and digit');

export const confirmPasswordSchema = (password: string) =>
  z.string()
    .refine(data => data === password, {
      message: "Password confirmation does not match",
    });


