import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

@InputType()
export class CreateMunicipioInput {
  @Field(() => Int)
  @IsNumber()
  estado_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  clave_inegi: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  superficie: string;
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  referencias: string;
  
  //doc: ;
}