import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateEstadoInput } from './create-estados.input';

@InputType()
export class UpdateEstadoInput extends PartialType(CreateEstadoInput) {
  @Field(() => ID)
  @IsNumber()
  id_estado: number;
}
