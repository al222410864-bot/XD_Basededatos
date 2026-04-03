import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateEjidoInput {
  @Field(() => Int)
  @IsNumber()
  ejidatario_id: number;

  @Field(() => Int)
  @IsNumber()
  municipio_id: number;

  @Field(() => Int)
  @IsNumber()
  certificado_id: number;

  @Field(() => String)
  @IsNotEmpty()
  superficie: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  uso: string;
}
