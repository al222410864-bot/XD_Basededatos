import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Certificado } from '../certificados/certificados.entity';
import { Deslinde } from '../deslindes/deslindes.entity';
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

  @Field(() => String)
  @Column({ type: 'text', nullable: true })
  coordenadas: string;

  @Field(() => String)
  @Column({ nullable: true })
  estado_nombre: string;

  @Field(() => String)
  @Column({ nullable: true })
  municipio_nombre: string;

  @Field(() => String)
  @Column({ nullable: true })
  ejido_nombre: string;

  @Field(() => [Certificado])
  @OneToMany(() => Certificado, (certificado) => certificado.parcela)
  certificado: Certificado[];

  @Field(() => [Deslinde])
  @OneToMany(() => Deslinde, (deslinde) => deslinde.parcela)
  deslinde: Deslinde[];

  @Field(() => Ejidatario)
  @ManyToOne(() => Ejidatario, (ejidatario) => ejidatario.parcela)
  @JoinColumn({ name: 'id_ejidatario' })
  ejidatario: Ejidatario;

  @Field(() => [Derecho])
  @OneToMany(() => Derecho, (derecho) => derecho.parcela)
  derecho: Derecho[];
}
