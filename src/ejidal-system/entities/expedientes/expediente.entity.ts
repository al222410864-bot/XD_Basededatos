import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Constancia } from '../constancias/constancias.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Cesion } from '../cesion/cesion.entity';
import { Deslinde } from '../deslindes/deslindes.entity';
import { Certificado } from '../certificados/certificados.entity';
import { Persona } from '../personas/personas.entity';

@ObjectType()
@Entity('expedientes')
export class Expediente {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_expediente: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  demandas: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  actas: string;

  @Field(() => [Constancia])
  @OneToMany(() => Constancia, (constancia) => constancia.expediente)
  constancia: Constancia[];

  @Field(() => Persona, { nullable: true })
  @ManyToOne(() => Persona, (persona) => persona.expediente, { nullable: true })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @Field(() => [Cesion])
  @OneToMany(() => Cesion, (cesion) => cesion.expediente)
  cesion: Cesion[];

  @Field(() => [Deslinde])
  @OneToMany(() => Deslinde, (deslinde) => deslinde.expediente)
  deslinde: Deslinde[];

  @Field(() => Certificado, { nullable: true })
  @ManyToOne(() => Certificado, (certificado) => certificado.expediente, { nullable: true })
  @JoinColumn({ name: 'certificado_id' })
  certificado: Certificado;
}