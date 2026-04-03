
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Ejidatario } from '../../entities/ejidatarios/ejidatarios.entity';
import { CreateEjidatarioInput } from '../../dtos/ejidatarios/create-ejidatario.input';
import { UpdateEjidatarioInput } from '../../dtos/ejidatarios/update-ejidatario.input';

@Injectable()
export class EjidatarioService {
  constructor(
    @InjectRepository(Ejidatario)
    private repository: Repository<Ejidatario>
  ) {}

  async create(data: CreateEjidatarioInput): Promise<Ejidatario> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Ejidatario[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Ejidatario[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_ejidatario: 'ASC'},
    });
  }

  async findOne(id_ejidatario: number): Promise<Ejidatario | null> {
    return await this.repository.findOneBy({id_ejidatario});
  }

  async update(id_ejidatario: number, data: UpdateEjidatarioInput): Promise<Ejidatario> {
    data.id_ejidatario = id_ejidatario;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_ejidatario: ${id_ejidatario} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_ejidatario: number): Promise<boolean> {
    const result = await this.repository.delete({id_ejidatario});
    return result.affected ? result.affected > 0 : false;
  }
}
