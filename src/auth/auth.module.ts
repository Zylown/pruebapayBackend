import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './jwt.constants';
// import { JwtStrategy } from './jwt.strategy';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true, // esto es para que el módulo sea global y se pueda usar en toda la aplicación
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  // exports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
