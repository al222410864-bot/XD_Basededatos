import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateServicioInput } from './create-servicio-input';

@InputType()
export class UpdateServicioInput extends PartialType(CreateServicioInput) {
  @Field(() => ID)
  @IsNumber()
  id_servicio: number;
}