
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Detalle } from '../../entities/detalles/detalles.entity';
import { CreateDetalleInput } from '../../dtos/detalles/create-detalle.input';
import { UpdateDetalleInput } from '../../dtos/detalles/update-detalle.input';


@Injectable()
export class DetalleService {
  constructor(
    @InjectRepository(Detalle)
    private repository: Repository<Detalle>
  ) {}

  async create(data: CreateDetalleInput): Promise<Detalle> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Detalle[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Detalle[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_detalle: 'ASC'},
    });
  }

  async findOne(id_detalle: number): Promise<Detalle | null> {
    return await this.repository.findOneBy({id_detalle});
  }

  async update(id_deslinde: number, data: UpdateDetalleInput): Promise<Detalle> {
    data.id_detalle = id_deslinde;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_deslinde: ${id_deslinde} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_detalle: number): Promise<boolean> {
    const result = await this.repository.delete({id_detalle});
    return result.affected ? result.affected > 0 : false;
  }
}
