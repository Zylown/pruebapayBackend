import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // le ponemos <Role> para que sepa que es un Role con los valores de admin o standard
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      // reflector es una instancia de la clase Reflector que sirve para obtener metadatos de una clase o método
      context.getHandler(),
      context.getClass(),
    ]); // esto obtiene los role de la metadata de la clase o del método del controlador
    if (!role) {
      return true; // si no hay role, se permite el acceso
    }
    // console.log(role);
    // return true;
    const { user } = context.switchToHttp().getRequest(); // obtenemos el usuario del request
    /*
    // si se cumple que el role del usuario es igual al role del guard, se permite el acceso
    console.log(user.role, role);*/
    return role === user.role; // retornamos si el role del usuario es igual al role del guard
  }
}
