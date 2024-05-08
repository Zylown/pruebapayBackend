import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/rol.enum';

export const ROLES_KEY = 'roles';
// export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
// esto es un decorador que recibe SOLO un role y lo guarda en la metadata de la clase o método
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
// esto es un decorador que recibe varios roles y los guarda en la metadata de la clase o método
