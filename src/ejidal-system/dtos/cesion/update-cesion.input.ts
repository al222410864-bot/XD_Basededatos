import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateCesionInput } from './create-cesion.input';

@InputType()
export class UpdateCesionInput extends PartialType(CreateCesionInput) {
  @Field(() => ID)
  @IsNumber()
  id_cesion: number;
}