import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateDerechoInput } from './create-derechos.input';


@InputType()
export class UpdateDerechoInput extends PartialType(CreateDerechoInput) {
  @Field(() => ID)
  @IsNumber()
  id_derecho: number;
}