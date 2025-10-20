import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // cambia si usas otra URL
    credentials: true,
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
