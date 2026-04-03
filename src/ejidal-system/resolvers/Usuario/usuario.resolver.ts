import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Usuario } from '../../entities/usuarios/usuarios.entity';
import { CreateUsuarioInput } from '../../dtos/usuarios/create-usuario.input';
import { UpdateUsuarioInput } from '../../dtos/usuarios/update-usuario.input';
import { UsuarioService } from '../../services';

@Resolver(() => Usuario)
export class UsuarioResolver {

  constructor(private readonly usuarioService: UsuarioService) {}

  @Mutation(() => Usuario)
  createUsuario(
    @Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput,
  ) {
    return this.usuarioService.create(createUsuarioInput);
  }

  @Query(() => [Usuario], { name: 'usuarios' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Query(() => Usuario, { name: 'usuario' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.usuarioService.findOne(id);
  }

  @Mutation(() => Usuario)
  updateUsuario(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
  ) {
    return this.usuarioService.update(id, updateUsuarioInput);
  }

  @Mutation(() => Boolean)
  removeUsuario(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.usuarioService.remove(id);
  }

}