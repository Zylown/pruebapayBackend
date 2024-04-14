import { z } from 'zod';

export const CreateMovimientoDto = z.object({
  dni: z.string().length(8, { message: 'El DNI debe tener 8 caracteres' }),
  options: z
    .string()
    .nonempty({ message: 'Debe seleccionar al menos una operación' }),
  amount: z
    .number()
    .int()
    .min(1, { message: 'El monto debe ser mayor que cero' }), // esto es para que el monto sea mayor que cero y sea un entero
});

CreateMovimientoDto.required({ dni: true, options: true, amount: true }); // esto es para que el dni sea requerido y las opciones tambien

export type CreateMovimientoDto = z.infer<typeof CreateMovimientoDto>;

