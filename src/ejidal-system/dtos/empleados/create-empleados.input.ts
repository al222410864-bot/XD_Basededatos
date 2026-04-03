import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateEmpleadoInput {
  @Field(() => String)
  @IsString()
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
  area: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  funcion: string;
}