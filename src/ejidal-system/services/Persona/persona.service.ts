import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from '../../entities/personas/personas.entity';
import { CreatePersonaInput } from '../../dtos/persona/create-persona-input';
import { UpdatePersonaInput } from '../../dtos/persona/update-persona-input';


@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private repository: Repository<Persona>
  ) {}

  async create(data: CreatePersonaInput): Promise<Persona> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Persona[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Persona[]> {
    const skip = (page - 1) * limit;

    return await this.repository.find({
      skip,
      take: limit,
      order: { id_persona: 'ASC' },
    });
  }

 async findOne(id_persona: number): Promise<Persona | null> {
  return await this.repository.findOneBy({ id_persona });
}

  async update(id_persona: number, data: UpdatePersonaInput): Promise<Persona> {
    data.id_persona = id_persona;

    const register = await this.repository.preload(data);

    if (!register) {
      throw new NotFoundException(`Not found id_persona: ${id_persona}`);
    }

    return await this.repository.save(register);
  }

  async remove(id_persona: number): Promise<boolean> {
    const result = await this.repository.delete({ id_persona });
    return result.affected ? result.affected > 0 : false;
  }
}