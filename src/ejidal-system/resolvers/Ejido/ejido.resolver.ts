import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EjidoService } from '../../services/Ejido/ejido.service';
import { Ejido } from '../../entities/ejidos/ejidos.entity';
import { CreateEjidoInput } from '../../dtos/ejidos/create-ejidos.input';
import { UpdateEjidoInput } from '../../dtos/ejidos/update-ejidos.input';

@Resolver(() => Ejido)
export class EjidoResolver {

  constructor(private readonly ejidoService: EjidoService) {}

  // CREAR
  @Mutation(() => Ejido)
  createEjido(
    @Args('createEjidoInput') createEjidoInput: CreateEjidoInput,
  ) {
    return this.ejidoService.create(createEjidoInput);
  }

  // OBTENER TODOS
  @Query(() => [Ejido], { name: 'ejidos' })
  findAll() {
    return this.ejidoService.findAll();
  }

  // OBTENER UNO
  @Query(() => Ejido, { name: 'ejido' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.ejidoService.findOne(id);
  }

  // ACTUALIZAR
  @Mutation(() => Ejido)
  updateEjido(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEjidoInput') updateEjidoInput: UpdateEjidoInput,
  ) {
    return this.ejidoService.update(id, updateEjidoInput);
  }

  // ELIMINAR
  @Mutation(() => Ejido)
  removeEjido(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.ejidoService.remove(id);
  }

}