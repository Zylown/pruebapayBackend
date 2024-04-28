import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // para que solo se pueda acceder desde esta url
    credentials: true, // para que se envien las cookies
  }); // habilita el cors
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
