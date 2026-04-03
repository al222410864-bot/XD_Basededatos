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

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  hora: Date;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  fecha: number;
}