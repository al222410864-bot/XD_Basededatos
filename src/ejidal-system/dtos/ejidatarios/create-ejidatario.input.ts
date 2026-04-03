import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateEjidatarioInput {
  @Field(() => Int)
  @IsNumber()
  parcela_id: number;

  @Field(() => String)
  @IsNotEmpty()
  nombre: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  ap_p: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  ap_m: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  estatus: string;
}