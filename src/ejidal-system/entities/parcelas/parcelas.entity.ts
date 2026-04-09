import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Certificado } from '../certificados/certificados.entity';
import { Deslinde } from '../deslindes/deslindes.entity';
import { Municipio } from '../municipios/municipios.entity';
import { Ejidatario } from '../ejidatarios/ejidatarios.entity';
import { Derecho } from '../derechos/derechos.entity';

@ObjectType()
@Entity('parcelas')
export class Parcela {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_parcela: number;

  @Field(() => String)
  @Column()
  tamano: string;

  @Field(() => String)
  @Column()
  colindancias: string;

  @Field(() => [Certificado])
  @OneToMany(() => Certificado, (certificado) => certificado.parcela)
  certificado: Certificado[];

  @Field(() => [Deslinde])
  @OneToMany(() => Deslinde, (deslinde) => deslinde.parcela)
  deslinde: Deslinde[];

  @Field(() => Municipio)
  @ManyToOne(() => Municipio, (municipio) => municipio.parcela)
  @JoinColumn({ name: 'id_municipio' })
  municipio: Municipio;

  @Field(() => Ejidatario)
  @ManyToOne(() => Ejidatario, (ejidatario) => ejidatario.parcela)
  @JoinColumn({ name: 'id_ejidatario' })
  ejidatario: Ejidatario;

  @Field(() => [Derecho])
  @OneToMany(() => Derecho, (derecho) => derecho.parcela)
  derecho: Derecho[];
}
