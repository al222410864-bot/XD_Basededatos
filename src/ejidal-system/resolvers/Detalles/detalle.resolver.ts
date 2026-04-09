import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetalleService } from '../../services/Detalles/detalle.service';
import { Detalle } from '../../entities/detalles/detalles.entity';
import { CreateDetalleInput } from '../../dtos/detalles/create-detalle.input';
import { UpdateDetalleInput } from '../../dtos/detalles/update-detalle.input';

@Resolver(() => Detalle)
export class DetallesResolver {

  constructor(private readonly detallesService: DetalleService) {}

  // CREAR
  @Mutation(() => Detalle)
  createDetalle(
    @Args('createDetalleInput') createDetalleInput: CreateDetalleInput,
  ) {
    return this.detallesService.create(createDetalleInput);
  }

  // OBTENER TODOS
  @Query(() => [Detalle], { name: 'detalles' })
  findAll() {
    return this.detallesService.findAll();
  }

  // OBTENER UNO
  @Query(() => Detalle, { name: 'detalle' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.detallesService.findOne(id);
  }

 // ACTUALIZAR
@Mutation(() => Detalle)
updateDetalle(
  @Args('id', { type: () => Int }) id: number,
  @Args('updateDetalleInput') updateDetalleInput: UpdateDetalleInput,
) {
  return this.detallesService.update(id, updateDetalleInput);
}

  // ELIMINAR
  @Mutation(() => Detalle)
  removeDetalle(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.detallesService.remove(id);
  }

}