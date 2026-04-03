import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from '../../entities/servicios/servicios.entity';
import { CreateServicioInput } from '../../dtos/servicios/create-servicio-input';
import { UpdateServicioInput } from '../../dtos/servicios/update-servicio-input';



@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(Servicio)
    private repository: Repository<Servicio>
  ) {}

  async create(data: CreateServicioInput): Promise<Servicio> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Servicio[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Servicio[]> {
    const skip = (page - 1) * limit;

    return await this.repository.find({
      skip,
      take: limit,
      order: { id_servicio: 'ASC' },
    });
  }

 async findOne(id_servicio: number): Promise<Servicio | null> {
  return await this.repository.findOneBy({ id_servicio });
}

  async update(id_servicio: number, data: UpdateServicioInput): Promise<Servicio> {
    data.id_servicio = id_servicio;

    const register = await this.repository.preload(data);

    if (!register) {
      throw new NotFoundException(`Not found id_servicio: ${id_servicio}`);
    }

    return await this.repository.save(register);
  }

  async remove(id_servicio: number): Promise<boolean> {
    const result = await this.repository.delete({ id_servicio });
    return result.affected ? result.affected > 0 : false;
  }
}