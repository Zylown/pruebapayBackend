import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  findAll() {
    return 'Get all clients';
  }

  @Get(':id')
  findOne() {
    return 'Get one client';
  }

  @Post()
  create() {
    return 'Create client';
  }

  @Delete(':id')
  delete() {
    return 'Delete client';
  }

  @Put(':id')
  update() {
    return 'Update client';
  }
}
