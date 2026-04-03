import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateParcelaInput } from './create-parcela-input'; 

@InputType()
export class UpdateParcelaInput extends PartialType(CreateParcelaInput) {
  @Field(() => ID)
  @IsNumber()
  id_parcela: number;
}