import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConstanciaService } from '../../services/Constancias/constancia.service';
import { CreateConstanciaInput } from '../../dtos/constancias/create-contancias.input';
import { UpdateConstanciaInput } from '../../dtos/constancias/update-constancia.input';
import { Constancia } from '../../entities/constancias/constancias.entity';

@Resolver(() => Constancia)
export class ConstanciaResolver {
  constructor(private readonly service: ConstanciaService) {}

  @Query(() => [Constancia], { name: 'constancias' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Constancia], { name: 'constanciasP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Constancia, { name: 'constancia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Constancia, { name: 'createConstancia' })
  create(@Args('input') input: CreateConstanciaInput) {
    return this.service.create(input);
  }

  @Mutation(() => Constancia, { name: 'updateConstancia' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateConstanciaInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeConstancia' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}