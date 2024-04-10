import { z } from 'zod';

export const CreateClientDto = z.object({
  names: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255),
  dni: z.string().length(8, { message: 'El DNI debe tener 8 caracteres' }),
  options: z
    .string()
    .nonempty({ message: 'Debe seleccionar al menos una operación' }),
  email: z.string().email({ message: 'El correo no es válido' }),
  phone: z
    .string()
    .length(9, { message: 'El teléfono debe tener 9 caracteres' }),
  amount: z
    .number()
    .int()
    .min(1, { message: 'El monto debe ser mayor que cero' }), // esto es para que el monto sea mayor que cero y sea un entero
});

CreateClientDto.required({ dni: true, options: true }); // esto es para que el dni sea requerido y las opciones tambien

export type CreateClientDto = z.infer<typeof CreateClientDto>;
// eso es para que se pueda usar en otros archivos y se pueda inferir el tipo de dato que es CreateClientDto
