import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// SchemaFactory es una clase que se encarga de crear un esquema de mongoose
import * as moment from 'moment-timezone';

function formatDate() {
  return moment().tz('America/Lima').format('DD-MM-YYYY:HH:mm:ss');
}
// movimientos del dia
@Schema({
  timestamps: {
    updatedAt: false, // deshabilita el campo updatedAt
  },
})
export class Movimientos {
  @Prop({
    type: String,
    trim: true,
  })
  id: string;

  @Prop({
    type: String,
    trim: true,
  })
  idMov: string;

  @Prop({
    type: String,
    trim: true,
  })
  names: string;

  @Prop({
    trim: true,
  })
  options: string;

  @Prop({
    type: String,
    trim: true,
  })
  cuentaDestino: string;

  @Prop({
    type: String,
    trim: true,
  })
  banco: string;

  @Prop({
    type: String,
    trim: true,
  })
  nombreDestino: string;

  @Prop({
    trim: true,
  })
  amount: number;

  @Prop({ type: String, default: formatDate })
  createdAt: string;
}

export const MovimientosSchema = SchemaFactory.createForClass(Movimientos);
// SchemaFactory.createForClass(Movimientos) crea un esquema de mongoose a partir de la clase Movimientos (que es un schema de NestJS que se encarga de definir la estructura de la colección de la base de datos) y lo exporta para que pueda ser utilizado en otros archivos.
