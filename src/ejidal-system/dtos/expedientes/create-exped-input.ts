import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

@InputType()
export class CreateExpedienteInput {
  @Field(() => Int)
  @IsNumber()
  usuario_id: number;

  @Field(() => Int)
  @IsNumber()
  cesion_id: number;

  @Field(() => Int)
  @IsNumber()
  constancia_id: number;

  @Field(() => Int)
  @IsNumber()
  deslinde_id: number;

  @Field(() => Int)
  @IsNumber()
  certificado_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  demandas: string;
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  actas: string;
  
  //doc: ;
}