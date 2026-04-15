import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
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

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  imagen: string;

  @Field(() => Empleado, { nullable: true })
  @OneToOne(() => Empleado, (empleado) => empleado.usuario, { nullable: true })
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;

  @Field(() => Ejidatario, { nullable: true })
  @OneToOne(() => Ejidatario, (ejidatario) => ejidatario.usuario, { nullable: true })
  @JoinColumn({ name: 'id_ejidatario' })
  ejidatario: Ejidatario;

  @Field(() => [Servicio])
  @OneToMany(() => Servicio, (servicio) => servicio.usuario)
  servicio: Servicio[];
}
