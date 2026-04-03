import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString,IsDateString } from "class-validator";

@InputType()
export class CreateDeslindeInput {
  @Field(() => Int)
  @IsNumber()
  parcela_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  mapa: string;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  superficie: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  colindantes:string;

  @Field(() => Date)
  @IsDateString()
  @IsNotEmpty()
  fecha: Date;

}