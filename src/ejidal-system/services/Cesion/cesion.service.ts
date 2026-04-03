
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Cesion } from '../../entities/cesion/cesion.entity';
import { CreateCesionInput } from '../../dtos/cesion/create-cesion.input';
import { UpdateCesionInput } from '../../dtos/cesion/update-cesion.input';

@Injectable()
export class CesionService {
  constructor(
    @InjectRepository(Cesion)
    private repository: Repository<Cesion>
  ) {}

  async create(data: CreateCesionInput): Promise<Cesion> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Cesion[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Cesion[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_cesion: 'ASC'},
    });
  }

  async findOne(id_cesion: number): Promise<Cesion | null> {
    return await this.repository.findOneBy({id_cesion});
  }

  async update(id_cesion: number, data: UpdateCesionInput): Promise<Cesion> {
    data.id_cesion = id_cesion;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_cesion: ${id_cesion} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_cesion: number): Promise<boolean> {
    const result = await this.repository.delete({id_cesion});
    return result.affected ? result.affected > 0 : false;
  }
}
