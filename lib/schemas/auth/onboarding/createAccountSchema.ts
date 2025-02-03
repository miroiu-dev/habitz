import { z } from 'zod';

export const createAccountSchema = z.object({});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
