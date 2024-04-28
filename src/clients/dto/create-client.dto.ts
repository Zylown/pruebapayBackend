import { z } from 'zod';

export const CreateClientDto = z.object({
  dni: z.string().length(8, { message: 'El DNI debe tener 8 caracteres' }),
  names: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255),
  phone: z
    .string()
    .length(9, { message: 'El teléfono debe tener 9 caracteres' }),
  email: z.string().email({ message: 'El correo no es válido' }),
});

CreateClientDto.required({ dni: true }); // esto es para que el dni sea requerido y las opciones tambien

export type CreateClientDto = z.infer<typeof CreateClientDto>;
// eso es para que se pueda usar en otros archivos y se pueda inferir el tipo de dato que es CreateClientDto
