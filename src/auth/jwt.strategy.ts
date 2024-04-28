// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtConstants } from './jwt.constants';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // sirve para extraer el token de la cabecera de la petición
//       ignoreExpiration: false, // si es true, no se verifica la expiración del token
//       secretOrKey: jwtConstants.secret, // clave secreta para verificar la firma del token
//     });
//   }

//   async validate(payload: any) {
//     // el método validate se ejecuta si el token es válido
//     console.log('jwt.strategy', payload);
//     return {
//       role: payload.role,
//     }; // esto son los datos que se añaden al objeto req.user
//   }
// }
