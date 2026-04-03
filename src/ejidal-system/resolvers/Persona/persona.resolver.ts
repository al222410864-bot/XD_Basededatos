import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonaService } from '../../services/Persona/persona.service';
import { Persona } from '../../entities/personas/personas.entity';
import { CreatePersonaInput } from '../../dtos/persona/create-persona-input';
import { UpdatePersonaInput } from '../../dtos/persona/update-persona-input';

@Resolver(() => Persona)
export class PersonaResolver {

  constructor(private readonly personaService: PersonaService) {}

  @Mutation(() => Persona)
  createPersona(
    @Args('createPersonaInput') createPersonaInput: CreatePersonaInput,
  ) {
    return this.personaService.create(createPersonaInput);
  }

  @Query(() => [Persona], { name: 'personas' })
  findAll() {
    return this.personaService.findAll();
  }

  @Query(() => Persona, { name: 'persona' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.personaService.findOne(id);
  }

  @Mutation(() => Persona)
  updatePersona(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePersonaInput') updatePersonaInput: UpdatePersonaInput,
  ) {
    return this.personaService.update(id, updatePersonaInput);
  }

  @Mutation(() => Boolean)
  removePersona(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.personaService.remove(id);
  }

}