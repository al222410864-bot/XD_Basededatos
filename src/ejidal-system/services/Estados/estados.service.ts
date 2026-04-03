import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estado } from '../../entities/estados/estados.entity';
import { CreateEstadoInput } from '../../dtos/estados/create-estados.input';
import { UpdateEstadoInput } from '../../dtos/estados/update-estados.input';

@Injectable()
export class EstadosService {
  constructor(
    @InjectRepository(Estado)
    private repository: Repository<Estado>
  ) {}

  async create(data: CreateEstadoInput): Promise<Estado> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Estado[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Estado[]> {
    const skip = (page - 1) * limit;

    return await this.repository.find({
      skip,
      take: limit,
      order: { id_estado: 'ASC' },
    });
  }

  async findOne(id_estado: number): Promise<Estado | null> {
    return await this.repository.findOneBy({ id_estado });
  }

  async update(id_estado: number, data: UpdateEstadoInput): Promise<Estado> {
    data.id_estado = id_estado;

    const register = await this.repository.preload(data);

    if (!register) {
      throw new NotFoundException(`Register with Id_estado: ${id_estado} not found`);
    }

    return await this.repository.save(register);
  }

  async remove(id_estado: number): Promise<boolean> {
    const result = await this.repository.delete({ id_estado });

    return result.affected ? result.affected > 0 : false;
  }
}