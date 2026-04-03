import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { JoinColumn } from "typeorm";
import { Derecho } from "../derechos/derechos.entity";
import { Expediente } from "../expedientes/expediente.entity";


@ObjectType()
@Entity("cesiones")
export class Cesion {
  @Field(() => ID)  
  @PrimaryGeneratedColumn()
  id_cesion: number;

  @Field(() => String)
  @Column()
  titular: string;
  
  @Field(() => String)
  @Column()
  cesionario: string;

  @Field(() => String)
  @Column()
  testigos: string;

  @Field (()=> Derecho)
  @ManyToMany (() => Derecho, (derecho) => derecho.cesion)
  @JoinColumn({name : 'id_derechos'})
  derecho: Derecho

    @Field (() => Expediente)
  @ManyToOne (()=> Expediente, (expediente) =>expediente.cesion)
  @JoinColumn ({name : 'id_expediente'})
  expediente: Expediente
  
}



