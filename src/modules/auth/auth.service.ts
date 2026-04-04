import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// Importamos el UsuarioService que acabamos de arreglar arriba
import { UsuarioService } from '../../ejidal-system/services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // Fíjate cómo aquí inyectamos el UsuarioService y el JwtService, NO el Repository
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    // 1. Validar las credenciales
    async validateUser(nombre_usuario: string, contrasenaAProbar: string): Promise<any> {        // Pedimos prestado el método findOne al UsuarioService
        const usuario = await this.usuarioService.findOneByNombre(nombre_usuario);
        if (usuario) {
            // Comparamos la contraseña encriptada usando bcrypt
            const isPasswordMatching = await bcrypt.compare(contrasenaAProbar, usuario.contrasena);

            if (isPasswordMatching) {
                // Borramos la contraseña de los resultados por seguridad antes de devolverlo
                const { contrasena, ...result } = usuario;
                return result;
            }
        }
        return null;
    }

    // 2. Generar el Token JWT
    async login(usuario: any) {
        const payload = { sub: usuario.id_usuario, rol: usuario.rol };

        return {
            token: this.jwtService.sign(payload),
            usuario: usuario
        };
    }
}