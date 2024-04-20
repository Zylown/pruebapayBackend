import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MovimientosModule } from './movimientos/movimientos.module';

@Module({
  // imports: [MongooseModule.forRoot(process.env.MONGO_DB), ClientsModule],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB), // para conectar a la base de datos de mongo que esta en .env
    ClientsModule,
    MovimientosModule,
  ],
})
export class AppModule {}
