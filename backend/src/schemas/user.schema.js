
const { z } = require('zod');

//  Signup Schema
const SignupSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),

  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .max(20)
    .refine((val) => /[A-Z]/.test(val),        { message: 'Must contain at least one uppercase letter' })
    .refine((val) => /[0-9]/.test(val),        { message: 'Must contain at least one number' })
    .refine((val) => /[^a-zA-Z0-9]/.test(val), { message: 'Must contain at least one special character' }),

  
});

//  Login Schema 
const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),

  password: z.string({ required_error: 'Password is required' }),
});

module.exports = { SignupSchema, LoginSchema };