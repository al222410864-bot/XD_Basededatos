import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
// ✨ 1. Importamos el mega módulo del profesor
import { SistemaEjidatarioModule } from 'ejidal-system/sistema-ejidatario.module';

@Module({
  imports: [
    SistemaEjidatarioModule, // ✨ 2. Lo ponemos aquí en lugar de UsuarioModule
    PassportModule,
    JwtModule.register({
      secret: 'MI_CLAVE_SECRETA_SEWMEX_2026', 
      signOptions: { expiresIn: '8h' }, 
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}