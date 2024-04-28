import { z } from 'zod';

export const CreateUserDto = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, { message: 'Contraseña debe tener al menos 8 caracteres' }),
  role: z.enum(['admin', 'standard']),
});

CreateUserDto.required({
  username: true,
  password: true,
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
