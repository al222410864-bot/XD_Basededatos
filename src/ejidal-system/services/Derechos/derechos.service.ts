
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Derecho } from '../../entities/derechos/derechos.entity';
import { CreateDerechoInput } from '../../dtos/derechos/create-derechos.input';
import { UpdateDerechoInput } from '../../dtos/derechos/update-derechos.input';


@Injectable()
export class DerechosService {
  constructor(
    @InjectRepository(Derecho)
    private repository: Repository<Derecho>
  ) {}

  async create(data: CreateDerechoInput): Promise<Derecho> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Derecho[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Derecho[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_derecho: 'ASC'},
    });
  }

  async findOne(id_derecho: number): Promise<Derecho | null> {
    return await this.repository.findOneBy({id_derecho});
  }

  async update(id_derecho: number, data: UpdateDerechoInput): Promise<Derecho> {
    data.id_derecho = id_derecho;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_derecho: ${id_derecho} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_derecho: number): Promise<boolean> {
    const result = await this.repository.delete({id_derecho});
    return result.affected ? result.affected > 0 : false;
  }
}
