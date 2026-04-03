import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateMunicipioInput } from './create-municipio-inptut';

@InputType()
export class UpdateMunicipioInput extends PartialType(CreateMunicipioInput) {
  @Field(() => ID)
  @IsNumber()
  id_municipio: number;
}