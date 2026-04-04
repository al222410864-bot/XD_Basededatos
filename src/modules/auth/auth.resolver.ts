import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.type';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    // ✨ CAMBIO AQUÍ: Ahora pedimos el nombre_usuario como texto
    @Args('nombre_usuario') nombre_usuario: string,
    @Args('contrasena') contrasena: string
  ) {
    // Le pasamos el nombre al servicio
    const user = await this.authService.validateUser(nombre_usuario, contrasena);
    
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    
    return this.authService.login(user);
  }
}