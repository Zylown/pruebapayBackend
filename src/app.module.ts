import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DniService } from './dni/dni.service';
import { DniController } from './dni/dni.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://zylown20:NQW7vbcc9gSUUYTm@cluster0.0gdqwuk.mongodb.net/pruebapaydb',
    ),
    ClientsModule,
  ],
  providers: [DniService],
  controllers: [DniController],
})
export class AppModule {}
