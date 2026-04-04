import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expediente } from '../expedientes/expediente.entity';
import { Empleado } from '../empleados/empleados.entity';
import { Ejidatario } from '../ejidatarios/ejidatarios.entity';
import { Servicio } from '../servicios/servicios.entity';

@ObjectType()
@Entity('usuarios')
export class Usuario {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Field(() => String)
  @Column({ unique: true })
  nombre_usuario: string;

  @Field(() => String)
  @Column({ unique: true })
  contrasena: string;

  @Field(() => String)
  @Column()
  rol: string;
  
  @Field(() => String)
  @Column({ type: 'mediumtext' })
  imagen: string;



  @Field(() => Empleado)
  @OneToMany(() => Empleado, (empleado) => empleado.usuario)
  @JoinColumn({ name: 'id_constancia' })
  empleado: Empleado;

  @Field(() => Ejidatario)
  @OneToMany(() => Ejidatario, (ejidatario) => ejidatario.usuario)
  @JoinColumn({ name: 'id_ejidatario' })
  ejidatario: Ejidatario;

  @Field(() => Servicio)
  @OneToMany(() => Servicio, (servicio) => servicio.usuario)
  @JoinColumn({ name: 'id_servicio' })
  servicio: Servicio;
}
