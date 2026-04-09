import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Derecho } from '../derechos/derechos.entity';
import { Expediente } from '../expedientes/expediente.entity';

@ObjectType()
@Entity('personas')
export class Persona {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_persona: number;

  @Field(() => String)
  @Column()
  nombre: string;

  @Field(() => String)
  @Column()
  ap_p: string;

  @Field(() => String)
  @Column()
  ap_m: string;

  @Field(() => [Derecho])
  @ManyToMany(() => Derecho, (derecho) => derecho.persona)
  @JoinTable()
  derecho: Derecho[];

  @Field(() => [Expediente])
  @OneToMany(() => Expediente, (expediente) => expediente.persona)
  expediente: Expediente[];
}
