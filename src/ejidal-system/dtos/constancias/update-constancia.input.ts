import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateConstanciaInput } from './create-contancias.input';

@InputType()
export class UpdateConstanciaInput extends PartialType(CreateConstanciaInput) {
  @Field(() => ID)
  @IsNumber()
  id_constancia: number;
}