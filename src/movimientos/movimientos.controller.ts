import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('clientes/movimientos')
export class MovimientosController {
  constructor(private movimientoService: MovimientosService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
        throw new ConflictException('Movimiento con nombre ya existente');
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
