import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DniService } from './dni/dni.service';
import { DniController } from './dni/dni.controller';
import { ConfigModule } from '@nestjs/config';
import { MovimientosModule } from './movimientos/movimientos.module';

@Module({
  // imports: [MongooseModule.forRoot(process.env.MONGO_DB), ClientsModule],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    ClientsModule,
    MovimientosModule,
  ],
  providers: [DniService],
  controllers: [DniController],
})
export class AppModule {}
