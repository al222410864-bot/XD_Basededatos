import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MunicipioService } from '../../services/Municipio/municipio.service';
import { CreateMunicipioInput } from '../../dtos/municipio/create-municipio-inptut';
import { UpdateMunicipioInput } from '../../dtos/municipio/update-municipio-input';
import { Municipio } from '../../entities/municipios/municipios.entity';

@Resolver(() => Municipio)
export class MunicipioResolver {

  constructor(private readonly service: MunicipioService) {}

  @Query(() => [Municipio], { name: 'municipios' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Municipio], { name: 'municipiosP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Municipio, { name: 'municipio' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Municipio, { name: 'createMunicipio' })
  create(@Args('input') input: CreateMunicipioInput) {
    return this.service.create(input);
  }

  @Mutation(() => Municipio, { name: 'updateMunicipio' })
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateMunicipioInput,
  ) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'removeMunicipio' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}