import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';

interface RequestWithUser extends Request {
  user: {
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Res() res: Response,
    @Body() credentials: { username: string; password: string },
  ) {
    // Lógica de autenticación en AuthService
    try {
      const token = await this.authService.signIn(
        credentials.username,
        credentials.password,
      );
      // Si la autenticación es exitosa, retornar el token
      return res
        .status(200)
        .json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
      // Verificar si el error es una excepción de autenticación
      if (error instanceof UnauthorizedException) {
        // Si es una excepción de autenticación, relanzarla con el mensaje de error original
        throw new UnauthorizedException('Credenciales inválidas');
      }
      // Si es otro tipo de error, manejarlo como lo estás haciendo actualmente
      return res
        .status(500)
        .json({ message: 'Error interno del servidor, intentelo de nuevo' });
    }
  }

  @Get('profile')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard) // esto es para que se use el guard de jwt y el guard de roles
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
