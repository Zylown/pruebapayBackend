import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MovimientosGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user; // obtenemos el usuario de la petición
    console.log(user);
    if (user.role === 'admin') {
      console.log('El usuario es admin');
      return true; // si el rol del usuario es admin, permitimos la petición
    }
    return false; // si el rol del usuario no es admin, denegamos la petición
  }
}
