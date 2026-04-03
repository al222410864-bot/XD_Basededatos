import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsDateString, IsNumber } from "class-validator";

@InputType()
export class CreateCesionInput {
  @Field(() => Int)
  @IsNumber()
  id_cesion_derechos: number;

  @Field(() => Date)
  @IsDateString()
  @IsNotEmpty()
  fecha: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  titular: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  cesionario: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  testigos: string;
}