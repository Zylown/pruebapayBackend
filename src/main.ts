import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // habilita el cors
  app.useGlobalPipes(new ValidationPipe()); // sirve para validar los datos que se envian en el body
  await app.listen(3000);
}
bootstrap();
