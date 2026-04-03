import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Constancia } from "../constancias/constancias.entity";
import { Usuario } from "../usuarios/usuarios.entity";
import { Cesion } from "../cesion/cesion.entity";
import { Deslinde } from "../deslindes/deslindes.entity";
import { Certificado } from "../certificados/certificados.entity";


@ObjectType()
@Entity("expedientes")
export class Expediente {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_expediente: number;

  @Field(() => String)
  @Column()
  demandas: string;
  
  @Field(() => String)
  @Column()
  actas: Date;

  @Field (() => Constancia)
  @OneToMany (()=> Constancia, (constancia) =>constancia.expediente)
  @JoinColumn ({name : 'id_constancia'})
  constancia: Constancia

    @Field (() => Usuario)
  @OneToMany (()=> Usuario, (usuario) =>usuario.expediente)
  @JoinColumn ({name : 'id_usuario'})
  usuario: Usuario

  @Field (() => Cesion)
  @OneToMany (()=> Cesion, (cesion) =>cesion.expediente)
  @JoinColumn ({name : 'id_cesion'})
  cesion: Cesion

  @Field (() => Deslinde)
  @OneToMany (()=> Deslinde, (deslinde) =>deslinde.expediente)
  @JoinColumn ({name : 'id_deslinde'})
  deslinde: Deslinde

      @Field(() => Certificado)
    @OneToMany(() => Certificado, (certificado) => certificado.expediente)
    @JoinColumn({ name: "id_certificado" })
    certificado: Certificado;
}

