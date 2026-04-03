import { InputType, Field, Int, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreatePagoInput {
  @Field(() => Int)
  @IsNumber()
  detalle_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  contribuyente: string;
}

/*import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import {TipoPago} from 'src/sistema-escolar/entities/pagos/pago.entity';
import {EstadoPago} from 'src/sistema-escolar/entities/pagos/pago.entity';

@InputType()
export class CreatePagoInput {
  @Field(() => Int)
  @IsNumber()
  alumno_id: number;

  @Field(() => Int)
  @IsNumber()
  concepto_id: number;

  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  monto_pagado: number;

  @Field(() => Date)
  @IsDateString()
  @IsNotEmpty()
  fecha_pago: Date;

  @Field(() => String)
  @IsEnum(TipoPago)
  @IsNotEmpty()
  metodo_pago: TipoPago;

  @Field(() => String)
  @IsEnum(EstadoPago)
  @IsNotEmpty()
  estado: EstadoPago;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  referencia_bancaria?: string;
} */