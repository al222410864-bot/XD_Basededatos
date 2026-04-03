import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {DerechosService } from '../../services/Derechos/derechos.service';
import { CreateDerechoInput } from '../../dtos/derechos/create-derechos.input';
import { UpdateDerechoInput } from '../../dtos/derechos/update-derechos.input';
import { Derecho } from '../../entities/derechos/derechos.entity';

@Resolver(() => Derecho)
export class DerechoResolver {
  constructor(private readonly service: DerechosService) {}

  @Query(() => [Derecho], { name: 'derechos' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Derecho], { name: 'derechosP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Derecho, { name: 'derecho' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Derecho, { name: 'createDerecho' })
  create(@Args('input') input: CreateDerechoInput) {
    return this.service.create(input);
  }

  @Mutation(() => Derecho, { name: 'updateDerecho' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDerechoInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeDerecho' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}