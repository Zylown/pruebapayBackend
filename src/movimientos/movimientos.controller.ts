import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('clientes/movimientos')
export class MovimientosController {
  constructor(private movimientoService: MovimientosService) {}

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

  @Auth(Role.STANDARD, Role.ADMIN)
  @Post()
  async create(@Body() body: CreateMovimientoDto) {
    const validationResult = CreateMovimientoDto.safeParse(body);
    if (!validationResult.success) {
      console.log(validationResult.error.errors[0].message);
      throw new BadRequestException(
        validationResult.error.errors.map((err) => err.message),
      );
    }
    try {
      return await this.movimientoService.create(body);
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        // code 11000 es para cuando hay un duplicado en la base de datos
        throw new ConflictException('Movimiento con nombre ya existente');
      }
      throw error;
    }
  }

  @Auth(Role.STANDARD, Role.ADMIN)
  @Get(':idMov')
  async findById(@Param('idMov') idMov: string) {
    const movimiento = await this.movimientoService.findById(idMov);
    if (!movimiento) {
      throw new BadRequestException('Id Movimiento not found');
    }
    return {
      idMov: movimiento.idMov,
    };
  }

  @Auth(Role.ADMIN)
  @Get(':dni')
  async findByDni(@Param('dni') dni: string) {
    const movimiento = await this.movimientoService.findOne(dni);
    if (!movimiento) {
      throw new BadRequestException('Movimiento not found');
    }
    return movimiento;
  }
}
