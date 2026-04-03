import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateDeslindeInput } from '../deslindes/create-deslinde.input';


@InputType()
export class UpdateDetalleInput extends PartialType(CreateDeslindeInput) {
  @Field(() => ID)
  @IsNumber()
  id_detalle: number;
}