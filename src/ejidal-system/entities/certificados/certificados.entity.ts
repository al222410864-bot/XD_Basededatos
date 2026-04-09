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
import { Ejidatario } from '../ejidatarios/ejidatarios.entity';
import { Parcela } from '../parcelas/parcelas.entity';
import { Expediente } from '../expedientes/expediente.entity';
import { Ejido } from '../ejidos/ejidos.entity';
import { Derecho } from '../derechos/derechos.entity';

@ObjectType()
@Entity('certificados')
export class Certificado {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_certificado: number;

  @Field(() => String)
  @Column()
  No_certificado: string;

  @Field(() => String)
  @Column()
  conformidad_parcelario: string;

  @Field(() => String)
  @Column({ unique: true })
  folio: string;

  @Field(() => Ejidatario)
  @OneToOne(() => Ejidatario, (ejidatario) => ejidatario.certificado)
  @JoinColumn({ name: 'id_ejidatario' })
  ejidatario: Ejidatario;

  @Field(() => [Parcela])
  @OneToMany(() => Parcela, (parcela) => parcela.certificado)
  @JoinColumn({ name: 'id_parcela' })
  parcela: Parcela[];

  @Field(() => [Expediente])
  @OneToMany(() => Expediente, (expediente) => expediente.certificado)
  expediente: Expediente[];

  @Field(() => Ejido)
  @ManyToOne(() => Ejido, (ejido) => ejido.certificado)
  @JoinColumn({ name: 'id_ejido' })
  ejido: Ejido;

  @Field(() => [Derecho])
  @OneToMany(() => Derecho, (derecho) => derecho.certificado)
  derecho: Derecho[];
}
