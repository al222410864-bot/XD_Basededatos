import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParcelaService } from '../../services/Parcela/parcela.service';
import { CreateParcelaInput } from '../../dtos/parcela/create-parcela-input';
import { UpdateParcelaInput } from '../../dtos/parcela/update-parcela-input';
import { Parcela } from '../../entities/parcelas/parcelas.entity';

@Resolver(() => Parcela)
export class ParcelaResolver {



  constructor(private readonly service: ParcelaService) { }

  @Query(() => [Parcela], { name: 'parcelas' })
  findAll() {
    return this.service.findAll();
  }


  @Query(() => [Parcela], { name: 'parcelasPaginadas' })
  findAllPaginate(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }


  @Query(() => Parcela, { name: 'parcela' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Parcela, { name: 'createParcela' })
  create(@Args('input') input: CreateParcelaInput) {
    return this.service.create(input);
  }

  @Mutation(() => Parcela, { name: 'updateParcela' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateParcelaInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeParcela' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }

}