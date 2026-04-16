import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, MinLength, IsOptional } from 'class-validator';

@InputType()
export class CreateUsuarioInput {
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
  rol: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  correo?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  estado?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  imagen?: string;
} 