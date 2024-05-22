import { z } from 'zod';

export const CreateMovimientoDto = z.object({
  idMov: z.string(),
  names: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255),
  options: z
    .string()
    .nonempty({ message: 'Debe seleccionar al menos una operación' }),
  amount: z.number().min(1, { message: 'El monto debe ser mayor que cero' }), // esto es para que el monto sea mayor que cero y sea un entero
  banco: z.string().optional(),
  cuentaOrigen: z
    .string()
    .max(20, {
      message: 'El número de cuenta debe tener como máximo 20 dígitos',
    })
    .optional(),
  nombreOrigen: z.string().optional(),
  cuentaDestino: z
    .string()
    .max(20, {
      message: 'El número de cuenta debe tener como máximo 20 dígitos',
    })
    .optional(),
  nombreDestino: z.string().optional(),
  phoneRecarga: z
    .string()
    .max(9, {
      message: 'El número de teléfono debe tener como máximo 9 dígitos',
    })
    .optional(),
});

CreateMovimientoDto.required({
  names: true,
  options: true,
  amount: true,
  idMov: true,
}); // esto es para que el names sea requerido y las opciones tambien

export type CreateMovimientoDto = z.infer<typeof CreateMovimientoDto>;
