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
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Roles(Role.ADMIN && Role.STANDARD)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Post()
  async create(@Body() body: CreateClientDto) {
    const validationResult = CreateClientDto.safeParse(body);
    if (!validationResult.success) {
      console.log(validationResult.error.errors[0].message);
      // throw new BadRequestException(validationResult.error.errors[0].message);// esto es para que solo muestre el primer error
      throw new BadRequestException(
        validationResult.error.errors.map((err) => err.message),
      );
    }

    try {
      return await this.clientService.create(body);
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        // code 11000 es para cuando hay un duplicado en la base de datos
        throw new ConflictException('Cliente con DNI ya existente');
      }
      throw error;
    }
  }

  /*@Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }*/

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

  //find by dni
  @Get('dni/:dni')
  async findByDni(@Param('dni') dni: string) {
    const data = await this.clientService.findByDni(dni);
    if (!data) {
      throw new NotFoundException('Dni no encontrado');
    }
    return {
      // dni: data?.dni,
      nombre: data?.names,
      email: data?.email,
      phone: data?.phone,
    };
  }
}
