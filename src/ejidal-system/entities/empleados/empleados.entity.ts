import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Usuario } from "../usuarios/usuarios.entity";

@ObjectType()
@Entity("empleados")
export class Empleado {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_empleado: number;

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
  area: string;

  @Field(() => String)
  @Column()
  funcion: string;

    @Field (() => Usuario)
      @OneToMany (()=> Usuario, (usuario) =>usuario.empleado)
      @JoinColumn ({name : 'id_usuario'})
      usuario: Usuario
}



