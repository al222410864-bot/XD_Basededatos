import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateDeslindeInput } from './create-deslinde.input';


@InputType()
export class UpdateDeslindeInput extends PartialType(CreateDeslindeInput) {
  @Field(() => ID)
  @IsNumber()
  id_deslinde: number;
}