
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Deslinde } from '../../entities/deslindes/deslindes.entity';
import { CreateDeslindeInput } from '../../dtos/deslindes/create-deslinde.input';
import { UpdateDeslindeInput } from '../../dtos/deslindes/update-deslinde.input';


@Injectable()
export class DeslindeService {
  constructor(
    @InjectRepository(Deslinde)
    private repository: Repository<Deslinde>
  ) {}

  async create(data: CreateDeslindeInput): Promise<Deslinde> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Deslinde[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Deslinde[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_deslinde: 'ASC'},
    });
  }

  async findOne(id_deslinde: number): Promise<Deslinde | null> {
    return await this.repository.findOneBy({id_deslinde});
  }

  async update(id_deslinde: number, data: UpdateDeslindeInput): Promise<Deslinde> {
    data.id_deslinde = id_deslinde;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_deslinde: ${id_deslinde} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_deslinde: number): Promise<boolean> {
    const result = await this.repository.delete({id_deslinde});
    return result.affected ? result.affected > 0 : false;
  }
}
