import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  //para un solo role se puede hacer así
  /*
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
    
    // si se cumple que el role del usuario es igual al role del guard, se permite el acceso
    //console.log(user.role, role);
    return role === user.role; // retornamos si el role del usuario es igual al role del guard
  }*/

  //para varios roles se puede hacer así
  canActivate(context: ExecutionContext): boolean {
    // Obtenemos los roles permitidos para el endpoint actual. Estos roles se definen
    // mediante el decorador @Auth en el controlador.
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se definen roles para el endpoint, permitimos el acceso sin verificar el rol del usuario.
    if (!roles) {
      return true;
    }

    // Obtenemos la solicitud HTTP actual.
    const request = context.switchToHttp().getRequest();

    // Obtenemos el rol del usuario de la solicitud. Este rol se establece en el guardia JwtAuthGuard
    // cuando se verifica el token JWT.
    const userRole = request.user.role;

    // Verificamos si el rol del usuario está incluido en los roles permitidos para el endpoint.
    // Si el rol del usuario está incluido, permitimos el acceso. Si no, se deniega el acceso.
    return roles.includes(userRole);
  }
}
