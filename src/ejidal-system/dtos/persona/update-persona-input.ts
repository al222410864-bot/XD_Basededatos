import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreatePersonaInput } from './create-persona-input';

@InputType()
export class UpdatePersonaInput extends PartialType(CreatePersonaInput) {
  @Field(() => ID)
  @IsNumber()
  id_persona: number;
}