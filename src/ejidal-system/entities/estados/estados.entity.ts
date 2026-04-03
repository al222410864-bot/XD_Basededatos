import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Municipio } from "../municipios/municipios.entity";

@ObjectType()
@Entity("estados")
export class Estado {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Field(() => String)
  @Column()
  nombre: string;

  @Field(() => String)
  @Column()
  territorio: string;

  @Field(() => Municipio)
  @OneToMany(() => Municipio, (municipio) => municipio.estado)
  @JoinColumn({ name: "id_municipio" })
  municipio: Municipio;
}
