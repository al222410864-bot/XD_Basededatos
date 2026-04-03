import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateServicioInput } from '../../dtos/servicios/create-servicio-input';
import { UpdateServicioInput } from '../../dtos/servicios/update-servicio-input';
import { Servicio } from '../../entities/servicios/servicios.entity';
import { ServicioService } from '../../services';

@Resolver(() => Servicio)
export class ServicioResolver {
  constructor(private readonly service: ServicioService) {}

  @Query(() => [Servicio], { name: 'servicios' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Servicio], { name: 'serviciosP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Servicio, { name: 'servicio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Servicio, { name: 'createServicio' })
  create(@Args('input') input: CreateServicioInput) {
    return this.service.create(input);
  }

  @Mutation(() => Servicio, { name: 'updateServicio' })
  update(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateServicioInput) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeServicio' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}