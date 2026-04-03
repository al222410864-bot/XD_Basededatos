import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateConstanciaInput {
  @Field(() => Int)
  @IsNumber()
  id_constancias: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  solicitante: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  motivo: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  folio: string;
}
