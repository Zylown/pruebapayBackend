import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'; // importamos cookie-parser

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.SERVER.split(','); // se obtiene el servidor desde el archivo .env
  app.enableCors({
    origin: allowedOrigins,
    credentials: true, // para que se envien las cookies
  }); // habilita el cors
  app.use(cookieParser()); // se usa cookie-parser
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina los campos que no esten en el DTO
      forbidNonWhitelisted: true, // evita que se envien campos no permitidos
      transform: true, // convierte los tipos de datos a los que se especifican en el DTO
    }),
  ); // sirve para validar los datos que se envian en el body
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
