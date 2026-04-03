import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeslindeService } from '../../services/Deslindes/deslinde.service';
import { CreateDeslindeInput } from '../../dtos/deslindes/create-deslinde.input';
import { UpdateDeslindeInput } from '../../dtos/deslindes/update-deslinde.input';
import { Deslinde } from '../../entities/deslindes/deslindes.entity';

@Resolver(() => Deslinde)
export class DeslindeResolver {
  constructor(private readonly service: DeslindeService) {}

  @Query(() => [Deslinde], { name: 'deslindes' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Deslinde], { name: 'deslindesP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Deslinde, { name: 'deslinde' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Deslinde, { name: 'createDeslinde' })
  create(@Args('input') input: CreateDeslindeInput) {
    return this.service.create(input);
  }

  @Mutation(() => Deslinde, { name: 'updateDeslinde' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateDeslindeInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeDeslinde' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}