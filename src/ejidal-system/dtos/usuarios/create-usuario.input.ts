import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateUsuarioInput {
  // ✨ 3. Borramos empleado_id, ejidatario_id, etc. de aquí.
  // El registro básico solo necesita credenciales.

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  nombre_usuario: string;

  @Field(() => String)
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasena: string;

  @Field(() => String)
  @IsString()
  rol: string; // Admin, Empleado, Ejidatario

  @Field(() => String)
  @IsString()
  @IsNotEmpty({ message: 'La imagen de perfil es obligatoria' })
  imagen: string; // Aquí recibiremos el chorizo de base64
} 