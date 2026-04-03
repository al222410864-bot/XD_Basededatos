import { InputType, Field, Int, ID} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';

@InputType()
export class CreateCertificadoInput {
  @Field(() => Int)
  @IsNumber()
  parcela_id: number;

  @Field(() => Int)
  @IsNumber()
  ejidatario_id: number;
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  No_certificado: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  conformidad_parcelario: string; 

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  folio: string;

}