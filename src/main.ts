import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✨ ESTA LÍNEA ES LA MAGIA QUE PERMITE QUE REACT SE CONECTE ✨
  app.enableCors({
    origin: '*', // En producción aquí pondrías la URL real de tu página
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();