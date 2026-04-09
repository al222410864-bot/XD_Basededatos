import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Cesion } from '../cesion/cesion.entity';
import { Ejido } from '../ejidos/ejidos.entity';
import { Parcela } from '../parcelas/parcelas.entity';
import { Deslinde } from '../deslindes/deslindes.entity';
import { Certificado } from '../certificados/certificados.entity';
import { Persona } from '../personas/personas.entity';

@ObjectType()
@Entity('derechos')
export class Derecho {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_derecho: number;

  @Field(() => String)
  @Column()
  acuerdos: string;

  @Field(() => [Cesion])
  @ManyToMany(() => Cesion, (cesion) => cesion.derecho)
  cesion: Cesion[];

  @Field(() => [Ejido])
  @ManyToMany(() => Ejido, (ejido) => ejido.derecho)
  ejido: Ejido[];

  @Field(() => [Parcela])
  @ManyToMany(() => Parcela, (parcela) => parcela.derecho)
  parcela: Parcela[];

  @Field(() => [Deslinde])
  @ManyToMany(() => Deslinde, (deslinde) => deslinde.derecho)
  deslinde: Deslinde[];

  @Field(() => [Certificado])
  @ManyToMany(() => Certificado, (certificado) => certificado.derecho)
  certificado: Certificado[];

  @Field(() => [Persona])
  @ManyToMany(() => Persona, (persona) => persona.derecho)
  persona: Persona[];
}
