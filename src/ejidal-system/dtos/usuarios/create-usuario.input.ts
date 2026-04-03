import {InputType, Field, Int, ID} from '@nestjs/graphql';
import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

@InputType()
export class CreateUsuarioInput {
  @Field(() => Int)
  @IsNumber()
  empleado_id: number;

  @Field(() => Int)
  @IsNumber()
  ejidatario_id: number;

  @Field(() => Int)
  @IsNumber()
  servicio_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  contrasena: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  rol: string;

  @Field(() => String)
  @IsString()
  imagen: string;

}
