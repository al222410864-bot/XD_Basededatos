import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

@InputType()
export class CreateParcelaInput {
  @Field(() => Int)
  @IsNumber()
  ejidatario_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  estado_nombre: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  municipio_nombre: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  ejido_nombre: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  tamano: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  colindancias: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  coordenadas?: string;
}