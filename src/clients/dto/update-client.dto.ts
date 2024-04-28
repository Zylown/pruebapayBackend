import { z } from 'zod';

export const UpdateClientDto = z.object({
  names: z.string().min(3).max(255).optional(),
  dni: z.string().length(8).optional(),
  options: z.string().array().nonempty().optional(),
  email: z.string().email().optional(),
  phone: z.string().length(9).optional(),
  amount: z.number().int().positive().optional(),
});

export type UpdateClientDto = z.infer<typeof UpdateClientDto>;
