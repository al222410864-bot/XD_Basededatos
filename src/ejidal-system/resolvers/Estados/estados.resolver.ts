import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EstadosService } from '../../services/Estados/estados.service';
import { UpdateEstadoInput } from '../../dtos/estados/update-estados.input';
import { Estado } from '../../entities/estados/estados.entity';
import { CreateEstadoInput } from '../../dtos/estados/create-estados.input';

@Resolver(() => Estado)
export class EstadosResolver {
  constructor(private readonly service: EstadosService) {}  /*marca error porque aun no se crea estados service ,importar service de estados*/

  @Query(() => [Estado], { name: 'estados' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Estado], { name: 'estadosP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Estado, { name: 'estado' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Estado, { name: 'createEstado' })
  create(@Args('input') input: CreateEstadoInput) {
    return this.service.create(input);
  }

  @Mutation(() => Estado, { name: 'updateEstado' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateEstadoInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeEstado' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}