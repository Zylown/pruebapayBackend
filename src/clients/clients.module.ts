import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Clients, ClientsSchema } from 'src/schemas/clients.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clients.name,
        schema: ClientsSchema,
      },
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
