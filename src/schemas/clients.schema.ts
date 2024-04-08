import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: {
    currentTime: () => new Date(),
  },
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
  options: string;

  @Prop({
    trim: true,
  })
  names?: string;

  @Prop({
    trim: true,
  })
  amount: number;

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
