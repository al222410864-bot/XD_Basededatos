import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsNumber} from 'class-validator';
import { CreateCertificadoInput } from './create-cetificados.input';
@InputType()
export class UpdateCertificadoInput extends PartialType(CreateCertificadoInput) {
  @Field(() => ID)
  @IsNumber()
  id_certificado: number;
}