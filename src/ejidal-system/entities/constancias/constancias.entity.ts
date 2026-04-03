import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Expediente } from "../expedientes/expediente.entity";

@ObjectType()
@Entity("constancias")
export class Constancia {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_constancia: number;

  @Field(() => String)
  @Column()
  solicitante: string;

  @Field(() => String)
  @Column()
  motivo: string;
  
  @Field(() => String)
  @Column({unique:true})
  folio: string;

    @Field (() => Expediente)
  @OneToMany (()=> Expediente, (expediente) =>expediente.constancia)
  @JoinColumn ({name : 'id_expediente'})
  expediente: Expediente

}

