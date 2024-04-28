import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne(username); // Buscamos el usuario en la base de datos
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // si no existe el usuario o la contraseña no coincide
      console.log(user, password);
      throw new UnauthorizedException('Credenciales inválidas'); // lanzamos una excepción
    }
    // Si el usuario existe y la contraseña coincide, generamos un token
    const payload = { role: user.role }; // sub es el id del usuario y role es el rol del usuario
    // return this.jwtService.sign(payload); // generamos el token
    const token = this.jwtService.sign(payload); // generamos el token
    return { token, role: user.role }; // retornamos el token
  }

  // Método para obtener la información del usuario autenticado
  async profile({ role }: { role: string }) {
    if (role !== 'admin') {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta información',
      );
    }
    return await this.usersService.getAll();
  }
}
