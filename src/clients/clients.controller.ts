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
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('clients')
export class ClientsController {
  constructor(
    private clientService: ClientsService,
    private jwtService: JwtService, // se inyecta JwtService
  ) {}

  @Auth(Role.STANDARD, Role.ADMIN)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Auth(Role.STANDARD, Role.ADMIN)
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


  @Auth(Role.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const client = await this.clientService.deleteOne(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  @Auth(Role.ADMIN)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    const client = await this.clientService.updateOne(id, body);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  //find by dni
  @Auth(Role.STANDARD, Role.ADMIN)
  @Get('dni/:dni')
  async findByDni(@Param('dni') dni: string, @Req() req: Request) {
    // Aquí puedes acceder al token desde las cookies
    const token = req.cookies.token;

    // Luego, puedes verificar el token y realizar la autenticación
    try {
      const decoded = this.jwtService.verify(token);

      // Si el token es válido, retorna el estado de autenticación y el rol del usuario
      if (decoded) {
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
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta información',
      );
    }
  }
}
