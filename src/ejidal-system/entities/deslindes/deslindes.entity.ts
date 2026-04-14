import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expediente } from '../expedientes/expediente.entity';
import { Parcela } from '../parcelas/parcelas.entity';
import { Derecho } from '../derechos/derechos.entity';

@ObjectType()
@Entity('deslindes')
export class Deslinde {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_deslinde: number;

  @Field(() => String)
  @Column()
  mapa: string;

  @Field(() => Number)
  @Column()
  superficie: number;

  @Field(() => Expediente)
  @ManyToOne(() => Expediente, (expediente) => expediente.deslinde)
  @JoinColumn({ name: 'id_expediente' })
  expediente: Expediente;

  @Field(() => Parcela)
  @ManyToOne(() => Parcela, (parcela) => parcela.deslinde, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_parcela' })
  parcela: Parcela;

  @Field(() => [Derecho])
  @OneToMany(() => Derecho, (derecho) => derecho.deslinde)
  derecho: Derecho[];
}
