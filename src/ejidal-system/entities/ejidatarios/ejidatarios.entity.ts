import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Certificado } from "../certificados/certificados.entity";
import { Usuario } from "../usuarios/usuarios.entity";
import { Ejido } from "../ejidos/ejidos.entity";
import { Parcela } from "../parcelas/parcelas.entity";


@ObjectType()
@Entity("ejidatarios")
export class Ejidatario {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_ejidatario: number;

  @Field(() => String)
  @Column()
  nombre: string;

  @Field(() => String)
  @Column()
  ap_p: string;

  @Field(() => String)
  @Column()
  ap_m: string;

  @Field(() => String)
  @Column()
  estatus:string;

  @Field(() => Certificado)
  @OneToMany(() => Certificado, (certificado) => certificado.ejidatario)
  @JoinColumn({ name: "id_certificado" })
  certificado: Certificado;

  @Field(() => Usuario)
  @OneToMany(() => Usuario, (usuario) => usuario.ejidatario)
  @JoinColumn({ name: "id_usuario" })
  usuario: Usuario;

  @Field(() => Ejido)
  @OneToMany(() => Ejido, (ejido) => ejido.ejidatario)
  @JoinColumn({ name: "id_ejido" })
  ejido: Ejidatario;

  @Field(() => Parcela)
  @OneToMany(() => Parcela, (parcela) => parcela.ejidatario)
  @JoinColumn({ name: "id_ejidatario" })
  parcela: Parcela;
}
