/**
 * Node modules
 */
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Insert a vallid email').min(1, 'Email is mandatory'),
  password: z.string().min(1, 'Password is mandatory'),
});

export const registerSchema = z
  .object({
    email: z.email('Insert a vallid email').min(1, 'Email is mandatory'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 character long')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase character')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm the password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'The passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

export const emailValidator = z
  .email('Enter a valid email')
  .min(1, 'Email is required');

export const passwordValidator = z.string().min(1, 'Password is required');
