import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../enums/rol.enum';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';

// solo acepta UN role
// export function Auth(role: Role) {
//   return applyDecorators(
//     Roles(role), // Role.ADMIN es igual a role
//     UseGuards(JwtAuthGuard, RolesGuard),
//   );
// }

// acepta varios roles
export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
}
