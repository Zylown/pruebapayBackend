import { z } from 'zod';

export const CreateMovimientoDto = z.object({
  names: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255),
  options: z
    .string()
    .nonempty({ message: 'Debe seleccionar al menos una operación' }),
  amount: z
    .number()
    .int()
    .min(1, { message: 'El monto debe ser mayor que cero' }), // esto es para que el monto sea mayor que cero y sea un entero
});

CreateMovimientoDto.required({ names: true, options: true, amount: true }); // esto es para que el names sea requerido y las opciones tambien

export type CreateMovimientoDto = z.infer<typeof CreateMovimientoDto>;
