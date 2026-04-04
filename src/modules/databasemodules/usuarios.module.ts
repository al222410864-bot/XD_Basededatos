import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'ejidal-system/entities';// Ajusta la ruta si es necesario
import { UsuarioService } from 'ejidal-system/services';// Ajusta la ruta si es necesario
import { UsuarioResolver } from 'ejidal-system/resolvers'; // Ajusta la ruta si es necesario

@Module({
  // 1. imports: Aquí le decimos a TypeORM (tu ORM) que cree la tabla basada en tu Entidad
  imports: [TypeOrmModule.forFeature([Usuario])],
  
  // 2. providers: Aquí registramos el cerebro (Service) y los endpoints de GraphQL (Resolver)
  providers: [UsuarioService, UsuarioResolver],
  
  // 3. exports: ¡ESTO ES CRÍTICO PARA EL LOGIN! 
  // Al exportar el UsuarioService, le damos permiso al futuro AuthModule de usarlo 
  // para buscar usuarios en la base de datos y validar contraseñas.
  exports: [UsuarioService], 
})
export class UsuarioModule {}