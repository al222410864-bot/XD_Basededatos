import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

@InputType()
export class CreateServicioInput {
  @Field(() => Int)
  @IsNumber()
  pago_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  Asesoria: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  medicion: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  solicitudes: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  asesor: string;

    @Field(() => String)
  @IsString()
  @IsNotEmpty()
  documentacion: string;

  //doc: ;
}