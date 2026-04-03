import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CesionService } from '../../services/Cesion/cesion.service';
import { CreateCesionInput } from '../../dtos/cesion/create-cesion.input';
import { UpdateCesionInput } from '../../dtos/cesion/update-cesion.input';
import { Cesion } from '../../entities/cesion/cesion.entity';

@Resolver(() => Cesion)
export class CesionResolver {
  constructor(private readonly service: CesionService) {}

  @Query(() => [Cesion], { name: 'cesiones' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Cesion], { name: 'cesionesP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Cesion, { name: 'cesion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Cesion, { name: 'createCesion' })
  create(@Args('input') input: CreateCesionInput) {
    return this.service.create(input);
  }

  @Mutation(() => Cesion, { name: 'updateCesion' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateCesionInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeCesion' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}