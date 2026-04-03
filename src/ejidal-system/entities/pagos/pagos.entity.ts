import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Servicio } from "../servicios/servicios.entity";
import { Detalle } from "../detalles/detalles.entity";


@ObjectType()
@Entity("pagos")
export class Pago {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Field(() => String)
  @Column()
  contribuyente: string;

  @Field(() => Servicio)
  @OneToMany(() => Servicio, (servicio) => servicio.pago)
  @JoinColumn({ name: "id_servicio" })
  servicio: Servicio;

  @Field(() => Detalle)
  @OneToMany(() => Detalle, (detalle) => detalle.pago)
  @JoinColumn({ name: "id_detalle" })
  detalle: Detalle;
}
