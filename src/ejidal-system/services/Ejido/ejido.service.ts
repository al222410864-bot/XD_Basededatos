
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Ejido } from '../../entities/ejidos/ejidos.entity';
import { CreateEjidoInput } from '../../dtos/ejidos/create-ejidos.input';
import { UpdateEjidoInput } from '../../dtos/ejidos/update-ejidos.input';


@Injectable()
export class EjidoService {
  constructor(
    @InjectRepository(Ejido)
    private repository: Repository<Ejido>
  ) {}

  async create(data: CreateEjidoInput): Promise<Ejido> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Ejido[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Ejido[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_ejido: 'ASC'},
    });
  }

  async findOne(id_ejido: number): Promise<Ejido | null> {
    return await this.repository.findOneBy({id_ejido});
  }

  async update(id_ejido: number, data: UpdateEjidoInput): Promise<Ejido> {
    data.id_ejido = id_ejido;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_ejido: ${id_ejido} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_ejido: number): Promise<boolean> {
    const result = await this.repository.delete({id_ejido});
    return result.affected ? result.affected > 0 : false;
  }
}
