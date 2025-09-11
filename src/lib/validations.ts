import { z } from 'zod'

// Password validation schema with comprehensive requirements
export const PasswordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' })
  .trim()

// Owner password form validation schema
export const OwnerPasswordFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .trim(),
  password: PasswordSchema,
  confirmPassword: z.string(),
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' })
    .trim(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .regex(/^[a-zA-Z0-9_-]+$/, { 
      message: 'Username can only contain letters, numbers, underscores, and hyphens' 
    })
    .trim(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Challenge lookup schema
export const ChallengeLookupSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .trim(),
})

// Password verification schema for existing challenges
export const PasswordVerificationSchema = z.object({
  challengeId: z.string().min(1, { message: 'Challenge ID is required' }),
  password: PasswordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Form state types based on schemas
export type OwnerPasswordFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    firstName?: string[];
    lastName?: string[];
    username?: string[];
    general?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined

export type ChallengeLookupFormState = {
  errors?: {
    email?: string[];
    general?: string[];
  };
  message?: string;
  challengeId?: string;
} | undefined

export type PasswordVerificationFormState = {
  errors?: {
    challengeId?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[];
  };
  message?: string;
  success?: boolean;
  redirectUrl?: string;
} | undefined