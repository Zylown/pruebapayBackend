import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movimientos, MovimientosSchema } from 'src/schemas/movimientos.schema';
import { MovimientosController } from './movimientos.controller';
import { MovimientosService } from './movimientos.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movimientos.name,
        schema: MovimientosSchema,
      },
    ]),
  ],
  controllers: [MovimientosController],
  providers: [MovimientosService],
})
export class MovimientosModule {}
