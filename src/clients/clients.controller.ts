import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from 'src/dto/create-client.dto';
import { UpdateClientDto } from 'src/dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Post()
  async create(@Body() body: CreateClientDto) {
    try {
      return await this.clientService.create(body);
    } catch (error) {
      console.log(error)
      if (error.code === 11000) {
        throw new ConflictException('Client already existsx');
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const client = await this.clientService.deleteOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    const client = await this.clientService.updateOne(id, body);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}