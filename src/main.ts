import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 1. Agrega esta importación
import { json, urlencoded } from 'express'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. ✨ EL FIX: Aumentar el límite a 50 Megabytes
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  // Tu configuración de CORS que ya debes tener
  app.enableCors(
    {
      origin:(origin,callback) => callback(null,origin),
      credentials:true
    }
  ); 

  app.listen(3000,'0.0.0.0'); 
}
bootstrap();