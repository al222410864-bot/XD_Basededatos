import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Ejido } from '../ejidos/ejidos.entity';
import { Parcela } from '../parcelas/parcelas.entity';
import { Estado } from '../estados/estados.entity';

@ObjectType()
@Entity('municipios')
export class Municipio {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_municipio: number;

  @Field(() => String)
  @Column()
  referencia: string;

  @Field(() => String)
  @Column()
  clave_inegi: string;

  @Field(() => String)
  @Column()
  nombre: string;

  @Field(() => String)
  @Column()
  territorio: string;

  @Field(() => [Ejido])
  @OneToMany(() => Ejido, (ejido) => ejido.municipio)
  ejido: Ejido[];

  @Field(() => [Parcela])
  @OneToMany(() => Parcela, (parcela) => parcela.municipio)
  parcela: Parcela[];

  @Field(() => Estado)
  @ManyToOne(() => Estado, (estado) => estado.municipio)
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;
}
