import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

var moment = require('moment'); // require

function formatDate() {
  return moment().format('DD-MM-YYYY:HH:mm:ss');
}

@Schema({
  timestamps: true,
})
export class Clients {
  @Prop({
    type: String,
    unique: true,
    trim: true,
  })
  dni: string;

  @Prop({
    trim: true,
  })
  names?: string;

  @Prop({
    trim: true,
  })
  phone: string;

  @Prop({
    trim: true,
  })
  email: string;

  @Prop({ type: String, default: formatDate })
  createdAt: string;

  @Prop({ type: String, default: formatDate })
  updatedAt: string;
}
export const ClientsSchema = SchemaFactory.createForClass(Clients);
