import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';

function formatDate() {
  return moment().tz('America/Lima').format('DD-MM-YYYY:HH:mm:ss');
}

@Schema({
  timestamps: true,
  strict: true, // que no se pueda guardar campos que no estén en el esquema
})
export class Users {
  @Prop({
    type: String,
    unique: true,
    trim: true,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    trim: true,
    default: 'standard',
  })
  role: 'admin' | 'standard';

  @Prop({
    type: String,
    trim: true,
    unique: true,
    required: true,
    select: false, // para que no se muestre en las consultas
  })
  password: string;

  @Prop({ type: String, default: formatDate })
  createdAt: string;

  @Prop({ type: String, default: formatDate })
  updatedAt: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
