import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateDerechoInput {
  @Field(() => Int)
  @IsNumber()
  cesion_id: number;

  @Field(() => Int)
  @IsNumber()
  ejido_id: number;

  @Field(() => Int)
  @IsNumber()
  parcela_id: number;

  @Field(() => Int)
  @IsNumber()
  deslinde_id: number;

  @Field(() => Int)
  @IsNumber()
  certificado_id: number;

  @Field(() => Int)
  @IsNumber()
  persona_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  acuerdos: string;



}