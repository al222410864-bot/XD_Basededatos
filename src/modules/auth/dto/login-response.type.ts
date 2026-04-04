import { ObjectType, Field } from '@nestjs/graphql';
import { Usuario } from 'ejidal-system/entities';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => Usuario)
  usuario: Usuario;
}