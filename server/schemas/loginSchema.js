import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('Invalid email address').nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
});
