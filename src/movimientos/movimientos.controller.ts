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
import { CreateMovimientoDto } from 'src/dto/movimientos/create-movimiento.dto';

@Controller('clientes/movimientos')
export class MovimientosController {
  constructor(private movimientoService: MovimientosService) {}

  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

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
        throw new ConflictException('Movimiento con DNI ya existente');
      }
      throw error;
    }
  }

  @Get(':dni')
  async findByDni(@Param('dni') dni: string) {
    const movimiento = await this.movimientoService.findOne(dni);
    if (!movimiento) {
      throw new BadRequestException('Movimiento not found');
    }
    return movimiento;
  }
}
