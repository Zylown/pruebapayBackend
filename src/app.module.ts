import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://zylown20:NQW7vbcc9gSUUYTm@cluster0.0gdqwuk.mongodb.net/',
    ),
    ClientsModule,
  ],
})
export class AppModule {}
