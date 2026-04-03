import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmpleadoService } from '../../services/Empleados/empleado.service';
import { Empleado } from '../../entities/empleados/empleados.entity';
import { CreateEmpleadoInput } from '../../dtos/empleados/create-empleados.input';
import { UpdateEmpleadoInput } from '../../dtos/empleados/update-empleados.input';

@Resolver(() => Empleado)
export class EmpleadosResolver {

  constructor(private readonly empleadosService: EmpleadoService) {}   

  @Mutation(() => Empleado)
  createEmpleado(
    @Args('createEmpleadoInput') createEmpleadoInput: CreateEmpleadoInput
  ) {
    return this.empleadosService.create(createEmpleadoInput);
  }

  @Query(() => [Empleado], { name: 'empleados' })
  findAll() {
    return this.empleadosService.findAll();
  }

  @Query(() => Empleado, { name: 'empleado' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.empleadosService.findOne(id);
  }

  @Mutation(() => Empleado)
  updateEmpleado(
    @Args('updateEmpleadoInput') updateEmpleadoInput: UpdateEmpleadoInput
  ) {
    return this.empleadosService.update(updateEmpleadoInput.id_empleado, updateEmpleadoInput);
  }

  @Mutation(() => String)
  removeEmpleado(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.empleadosService.remove(id);
  }

}