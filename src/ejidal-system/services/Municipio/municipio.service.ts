import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from '../../entities/municipios/municipios.entity';
import { CreateMunicipioInput } from '../../dtos/municipio/create-municipio-inptut';
import { UpdateMunicipioInput } from '../../dtos/municipio/update-municipio-input';

@Injectable()
export class MunicipioService {
  constructor(
    @InjectRepository(Municipio)
    private repository: Repository<Municipio>
  ) {}

  async create(data: CreateMunicipioInput): Promise<Municipio> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Municipio[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Municipio[]> {
    const skip = (page - 1) * limit;

    return await this.repository.find({
      skip,
      take: limit,
      order: { id_municipio: 'ASC' },
    });
  }

 async findOne(id_municipio: number): Promise<Municipio | null> {
  return await this.repository.findOneBy({ id_municipio });
}

  async update(id_municipio: number, data: UpdateMunicipioInput): Promise<Municipio> {
    data.id_municipio = id_municipio;

    const register = await this.repository.preload(data);

    if (!register) {
      throw new NotFoundException(`Not found id_municipio: ${id_municipio}`);
    }

    return await this.repository.save(register);
  }

  async remove(id_municipio: number): Promise<boolean> {
    const result = await this.repository.delete({ id_municipio });
    return result.affected ? result.affected > 0 : false;
  }
}