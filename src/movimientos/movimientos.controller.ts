import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { Role } from 'src/auth/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('clientes/movimientos')
export class MovimientosController {
  constructor(
    private movimientoService: MovimientosService,
    private jwtService: JwtService,
  ) {}

  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

  @Auth(Role.STANDARD, Role.ADMIN)
  @Post()
  async create(@Body() body: CreateMovimientoDto, @Req() req: Request) {
    const validationResult = CreateMovimientoDto.safeParse(body);
    if (!validationResult.success) {
      console.log(validationResult.error.errors[0].message);
      throw new BadRequestException(
        validationResult.error.errors.map((err) => err.message),
      );
    }
    // validacion el token desde las cookies HttpOnly
    const token = req.cookies.token;
    if (!token) {
      throw new BadRequestException('Token no encontrado');
    }

    try {
      // decodificar el token que nos trae desde las cookies
      const decoded = this.jwtService.verify(token);
      if (decoded) {
        return await this.movimientoService.create(body);
      }
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        // code 11000 es para cuando hay un duplicado en la base de datos
        throw new ConflictException('Movimiento con nombre ya existente');
      }
      throw new UnauthorizedException(
        'No tienes permiso para realizar esta acción',
      );
    }
  }

  @Auth(Role.STANDARD, Role.ADMIN)
  @Get('id/:idMov')
  async findById(@Param('idMov') idMov: string, @Req() req: Request) {
    // Verifica el token desde las cookies HttpOnly
    const token = req.cookies?.token;
    if (!token) {
      console.log('Token no encontrado');
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const decoded = this.jwtService.verify(token);
      if (decoded) {
        const movimiento = await this.movimientoService.findById(idMov);
        if (!movimiento) {
          throw new BadRequestException('Id Movimiento not found'); // si no existe el movimiento con ese id
        }
        return {
          idMov: movimiento.idMov, // si existe el movimiento con ese id
        };
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta información',
      );
    }
  }

  @Auth(Role.ADMIN)
  @Get(':dni')
  async findByDni(@Param('dni') dni: string, @Req() req: Request) {
    // Verifica el token desde las cookies HttpOnly
    const token = req.cookies?.token;
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const decoded = this.jwtService.verify(token);
      if (decoded) {
        const movimiento = await this.movimientoService.findOne(dni);
        if (!movimiento) {
          throw new BadRequestException('Movimiento not found');
        }
        return movimiento;
      }
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta información',
      );
    }
  }
}
