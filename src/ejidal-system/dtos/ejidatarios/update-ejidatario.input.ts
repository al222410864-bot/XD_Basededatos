import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateEjidatarioInput } from './create-ejidatario.input';


@InputType()
export class UpdateEjidatarioInput extends PartialType(CreateEjidatarioInput) {
  @Field(() => ID)
  @IsNumber()
  id_ejidatario: number;
}