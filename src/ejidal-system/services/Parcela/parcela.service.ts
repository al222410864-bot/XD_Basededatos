import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcela } from '../../entities/parcelas/parcelas.entity';
import { CreateParcelaInput } from '../../dtos/parcela/create-parcela-input';
import { UpdateParcelaInput } from '../../dtos/parcela/update-parcela-input';

@Injectable()
export class ParcelaService {
  constructor(
    @InjectRepository(Parcela)
    private repository: Repository<Parcela>
  ) {}

  async create(data: CreateParcelaInput): Promise<Parcela> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Parcela[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Parcela[]> {
    const skip = (page - 1) * limit;

    return await this.repository.find({
      skip,
      take: limit,
      order: { id_parcela: 'ASC' },
    });
  }

 async findOne(id_parcela: number): Promise<Parcela | null> {
  return await this.repository.findOneBy({ id_parcela });
}

  async update(id_parcela: number, data: UpdateParcelaInput): Promise<Parcela> {
    data.id_parcela = id_parcela;

    const register = await this.repository.preload(data);

    if (!register) {
      throw new NotFoundException(`Not found id_parcela: ${id_parcela}`);
    }

    return await this.repository.save(register);
  }

  async remove(id_parcela: number): Promise<boolean> {
    const result = await this.repository.delete({ id_parcela });
    return result.affected ? result.affected > 0 : false;
  }
}