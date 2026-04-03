import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Pago } from "../pagos/pagos.entity";

@ObjectType()
@Entity("detalles")
export class Detalle {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Field(() => String)
  @Column()
  cantidad: string;

  @Field(() => Date)
  @Column()
  fecha: Date;

  @Field(() => Date)
  @Column()
  hora: Date;

  @Field(() => Pago)
  @OneToMany(() => Pago, (pago) => pago.detalle)
  @JoinColumn({ name: "id_pago" })
  pago: Pago;
}
