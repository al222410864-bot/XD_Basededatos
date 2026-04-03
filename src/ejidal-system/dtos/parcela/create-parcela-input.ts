import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString,  } from "class-validator";

@InputType()
export class CreateParcelaInput {
  @Field(() => Int)
  @IsNumber()
  ejidatario_id: number;

  @Field(() => Int)
  @IsNumber()
  municipio_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  tamano: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  colindancias: string;

  //doc: ;
}