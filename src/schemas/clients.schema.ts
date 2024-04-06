import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Clients {
  @Prop({
    unique: true,
    trim: true,
  })
  id: string;
  @Prop({
    type: String,
    unique: true,
    trim: true,
  })
  dni: string;
  @Prop({
    trim: true,
  })
  names: string;
  @Prop({
    trim: true,
  })
  mount: number;
  @Prop({
    trim: true,
  })
  phone: string;
  @Prop({
    trim: true,
  })
  email: string;
}
export const ClientsSchema = SchemaFactory.createForClass(Clients);
