import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

interface RequestWithUser extends Request {
  user: {
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService, // se inyecta JwtService
  ) {}

  @Post('signin')
  async signIn(
    @Res() res: Response,
    @Body() credentials: { username: string; password: string },
  ) {
    // Lógica de autenticación en AuthService
    try {
      const { token, role } = await this.authService.signIn(
        credentials.username,
        credentials.password,
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // para que no se envíe la cookie en peticiones de terceros
      });
      //esto es para que el front sepa si el usuario está autenticado o no
      return res.status(200).json({
        authenticated: true,
        role,
        message: 'Inicio de sesión exitoso',
      });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }

  @Post('signout')
  async signOut(@Res() res: Response) {
    try {
      res.clearCookie('token');
      return res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }

  @Get('check')
  async checkAuth(@Req() req: Request, @Res() res: Response) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json({ authenticated: false });
      }
      const decoded = this.jwtService.verify(token);
      return res.json({ authenticated: true, role: decoded.role });
    } catch (error) {
      return res.json({ authenticated: false });
    }
  }
}
