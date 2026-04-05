import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpedienteService } from '../../services/Expedientes/expediente.service';
import { Expediente } from '../../entities/expedientes/expediente.entity';
import { CreateExpedienteInput } from '../../dtos/expedientes/create-exped-input';
import { UpdateExpedienteInput } from '../../dtos/expedientes/update-exped-input';

@Resolver(() => Expediente)
export class ExpedienteResolver {

  constructor(private readonly expedienteService: ExpedienteService) { }

  // CREAR
  @Mutation(() => Expediente)
  createExpediente(
    @Args('createExpedienteInput') createExpedienteInput: CreateExpedienteInput,
  ) {
    return this.expedienteService.create(createExpedienteInput);
  }

  @Query(() => [Expediente], { name: 'expedientesP' })
  findAllPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number,
  ) {
    return this.expedienteService.findAllPaginate(page, limit);
  }

  // OBTENER TODOS
  @Query(() => [Expediente], { name: 'expedientes' })
  findAll() {
    return this.expedienteService.findAll();
  }

  // OBTENER UNO
  @Query(() => Expediente, { name: 'expediente' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.expedienteService.findOne(id);
  }

  // ACTUALIZAR
  @Mutation(() => Expediente)
  updateExpediente(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateExpedienteInput') updateExpedienteInput: UpdateExpedienteInput,
  ) {
    return this.expedienteService.update(id, updateExpedienteInput);
  }

  // ELIMINAR
  @Mutation(() => Expediente)
  removeExpediente(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.expedienteService.remove(id);
  }

}