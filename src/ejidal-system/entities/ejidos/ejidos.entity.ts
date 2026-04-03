import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Ejidatario } from "../ejidatarios/ejidatarios.entity";
import { Municipio } from "../municipios/municipios.entity";
import { Certificado } from "../certificados/certificados.entity";
import { Derecho } from "../derechos/derechos.entity";


@ObjectType()
@Entity("ejidos")
export class Ejido {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_ejido: number;

  @Field(() => String)
  @Column()
  superficie: string;

  @Field(() => String)
  @Column()
  uso: String;

  @Field(() => Ejidatario)
  @OneToMany(() => Ejidatario, (ejidatario) => ejidatario.ejido)
  @JoinColumn({ name: "id_ejidatario" })
  ejidatario: Ejidatario;

  @Field(() => Municipio)
  @OneToMany(() => Municipio, (municipio) => municipio.ejido)
  @JoinColumn({ name: "id_municipio" })
  municipio: Municipio;

  @Field(() => Certificado)
  @OneToMany(() => Certificado, (certificado) => certificado.ejido)
  @JoinColumn({ name: "id_certificado" })
  certificado: Certificado;

  @Field(() => Derecho)
  @OneToMany(() => Derecho, (derecho) => derecho.ejido)
  @JoinColumn({ name: "id_derecho" })
  derecho: Derecho;
}
