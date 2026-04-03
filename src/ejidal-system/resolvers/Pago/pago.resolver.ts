import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PagoService } from '../../services';
import { CreatePagoInput } from '../../dtos/pago/create-pago-input';
import { UpdatePagoInput } from '../../dtos/pago/update-pago-input';
import { Pago } from '../../entities/pagos/pagos.entity';

@Resolver(() => Pago)
export class PagoResolver {

  constructor(private readonly service: PagoService) {}

  @Query(() => [Pago], { name: 'pagos' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Pago], { name: 'pagosP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Pago, { name: 'pago' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Pago, { name: 'createPago' })
  create(@Args('input') input: CreatePagoInput) {
    return this.service.create(input);
  }

  @Mutation(() => Pago, { name: 'updatePago' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePagoInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removePago' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }

}