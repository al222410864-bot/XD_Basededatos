import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateExpedienteInput } from './create-exped-input';
@InputType()
export class UpdateExpedienteInput extends PartialType(CreateExpedienteInput) {
  @Field(() => ID)
  @IsNumber()
  id_expediente: number;
}