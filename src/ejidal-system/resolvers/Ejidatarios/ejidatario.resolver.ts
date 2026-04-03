import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EjidatarioService } from '../../services/Ejidatarios/ejidatarios.service';
import { CreateEjidatarioInput } from '../../dtos/ejidatarios/create-ejidatario.input';
import { UpdateEjidatarioInput } from '../../dtos/ejidatarios/update-ejidatario.input';
import { Ejidatario } from '../../entities/ejidatarios/ejidatarios.entity';

@Resolver(() => Ejidatario)
export class EjidatarioResolver {

  constructor(private readonly service: EjidatarioService) {}

  // OBTENER TODOS
  @Query(() => [Ejidatario], { name: 'ejidatarios' })
  findAll() {
    return this.service.findAll();
  }

  // PAGINACIÓN
  @Query(() => [Ejidatario], { name: 'ejidatariosP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  // BUSCAR UNO
  @Query(() => Ejidatario, { name: 'ejidatario' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.service.findOne(id);
  }

  // CREAR
  @Mutation(() => Ejidatario, { name: 'createEjidatario' })
  create(
    @Args('input') input: CreateEjidatarioInput,
  ) {
    return this.service.create(input);
  }

  // ACTUALIZAR
  @Mutation(() => Ejidatario, { name: 'updateEjidatario' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateEjidatarioInput,
  ) {
    return this.service.update(id, input);
  }

  // ELIMINAR
  @Mutation(() => Boolean, { name: 'removeEjidatario' })
  remove(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.service.remove(id);
  }
}