import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Certificado } from "../certificados/certificados.entity";
import { Deslinde } from "../deslindes/deslindes.entity";
import { Municipio } from "../municipios/municipios.entity";
import { Ejidatario } from "../ejidatarios/ejidatarios.entity";
import { Derecho } from "../derechos/derechos.entity";


@ObjectType()
@Entity("parcelas")
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

  @Field(() => Certificado)
  @OneToMany(() => Certificado, (certificado) => certificado.parcela)
  @JoinColumn({ name: "id_parcela" })
  certificado: Certificado;

  @Field(() => Deslinde)
  @OneToMany(() => Deslinde, (deslinde) => deslinde.parcela)
  @JoinColumn({ name: "id_deslinde" })
  deslinde: Deslinde;

  @Field(() => Municipio)
  @OneToMany(() => Municipio, (municipio) => municipio.parcela)
  @JoinColumn({ name: "id_municipio" })
  municipio: Municipio;

  @Field(() => Ejidatario)
  @OneToMany(() => Ejidatario, (ejidatario) => ejidatario.parcela)
  @JoinColumn({ name: "id_ejidatario" })
  ejidatario: Ejidatario;

    @Field(() => Derecho)
  @OneToMany(() => Derecho, (derecho) => derecho.parcela)
  @JoinColumn({ name: "id_derecho" })
  derecho: Derecho;

}
