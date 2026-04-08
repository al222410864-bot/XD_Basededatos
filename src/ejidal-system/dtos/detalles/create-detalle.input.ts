import { InputType, Field, Int, ID } from "@nestjs/graphql";
import {  IsDate, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateDetalleInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  cantidad: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  cesionario: string;

  @Field(() => String)
  @IsDate()
  @IsNotEmpty()
  hora: string;

  @Field(() => String)
  @IsDate()
  @IsNotEmpty()
  fecha: string;
}