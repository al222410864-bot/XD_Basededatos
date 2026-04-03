
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Constancia } from '../../entities/constancias/constancias.entity';
import { CreateConstanciaInput } from '../../dtos/constancias/create-contancias.input';
import { UpdateConstanciaInput } from '../../dtos/constancias/update-constancia.input';


@Injectable()
export class ConstanciaService {
  constructor(
    @InjectRepository(Constancia)
    private repository: Repository<Constancia>
  ) {}

  async create(data: CreateConstanciaInput): Promise<Constancia> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Constancia[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Constancia[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_constancia: 'ASC'},
    });
  }

  async findOne(id_constancia: number): Promise<Constancia | null> {
    return await this.repository.findOneBy({id_constancia});
  }

  async update(id_constancia: number, data: UpdateConstanciaInput): Promise<Constancia> {
    data.id_constancia = id_constancia;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_cesion: ${id_constancia} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_constancia: number): Promise<boolean> {
    const result = await this.repository.delete({id_constancia});
    return result.affected ? result.affected > 0 : false;
  }
}
