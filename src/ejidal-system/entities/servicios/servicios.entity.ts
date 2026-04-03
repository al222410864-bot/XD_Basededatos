import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { JoinColumn } from "typeorm";
import { Usuario } from "../usuarios/usuarios.entity";
import { Pago } from "../pagos/pagos.entity";


@ObjectType()
@Entity("servicios")
export class Servicio {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_servicio: number;

  @Field(() => String)
  @Column()
  asesor: string;

  @Field(() => String)
  @Column()
  documentacion: string;

  @Field(() => String)
  @Column()
  medicion: string;

  @Field(() => String)
  @Column()
  solicitudes: string;

  @Field(() => Usuario)
  @OneToMany(() => Usuario, (usuario) => usuario.servicio)
  @JoinColumn({ name: "id_usuario" })
  usuario: Usuario;

    @Field(() => Pago)
  @OneToMany(() => Pago, (pago) => pago.servicio)
  @JoinColumn({ name: "id_pago" })
  pago: Pago;
}
