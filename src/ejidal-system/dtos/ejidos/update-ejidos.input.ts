import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateEjidoInput } from './create-ejidos.input';

@InputType()
export class UpdateEjidoInput extends PartialType(CreateEjidoInput) {
  @Field(() => ID)
  @IsNumber()
  id_ejido: number;
}