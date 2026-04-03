import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import { CertificadoService } from '../../services/Certificados/certificado.service';
import { CreateCertificadoInput } from '../../dtos/certificados/create-cetificados.input';
import { UpdateCertificadoInput } from '../../dtos/certificados/update-certificados.input';
import { Certificado } from '../../entities/certificados/certificados.entity';

@Resolver(() => Certificado)
export class CertificadoResolver {
  constructor(private readonly service: CertificadoService) {}

  @Query(() => [Certificado], {name: 'certificados'})
  findAll() {
    return this.service.findAll();
  }

  @Query(() => [Certificado], {name: 'certificadosP'})
  findAllPaginate(
    @Args('page', {type: () => Int, nullable: true, defaultValue: 1}) page: number,
    @Args('limit', {type: () => Int, nullable: true, defaultValue: 10}) limit: number,
  ) {
    return this.service.findAllPaginate(page, limit);
  }

  @Query(() => Certificado, {name: 'certificado'})
  findOne(@Args('id', {type: () => Int}) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Certificado, {name: 'createCertificado'})
  create(@Args('input') input: CreateCertificadoInput) {
    return this.service.create(input);
  }

  @Mutation(() => Certificado, {name: 'updateCertificado'})
  update(@Args('id', {type: () => Int}) id: number, @Args('input') input: UpdateCertificadoInput) {
    return this.service.update(id, input);
  }

  @Mutation(() => Boolean, {name: 'removeCertificado'})
  remove(@Args('id', {type: () => Int}) id: number) {
    return this.service.remove(id);
  }
}