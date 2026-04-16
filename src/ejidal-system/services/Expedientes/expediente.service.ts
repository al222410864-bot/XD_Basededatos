import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expediente } from '../../entities/expedientes/expediente.entity';
import { CreateExpedienteInput } from '../../dtos/expedientes/create-exped-input';
import { UpdateExpedienteInput } from '../../dtos/expedientes/update-exped-input';

@Injectable()
export class ExpedienteService {
  constructor(
    @InjectRepository(Expediente)
    private repository: Repository<Expediente>,
  ) {}

  async create(data: CreateExpedienteInput): Promise<Expediente> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Expediente[]> {
    return await this.repository.find({
      relations: ['persona', 'cesion', 'constancia', 'deslinde', 'certificado'],
    });
  }

  async findAllPaginate(
    page: number = 1,
    limit: number = 10,
  ): Promise<Expediente[]> {
    const skip = (page - 1) * limit;

    return await this.repository.find({
      skip,
      take: limit,
      order: { id_expediente: 'ASC' },
      relations: ['persona', 'cesion', 'constancia', 'deslinde', 'certificado'],
    });
  }

  async findOne(id_expediente: number): Promise<Expediente | null> {
    return await this.repository.findOne({
      where: { id_expediente },
      relations: ['persona', 'cesion', 'constancia', 'deslinde', 'certificado'],
    });
  }

  async update(
    id_expediente: number,
    data: UpdateExpedienteInput,
  ): Promise<Expediente> {
    data.id_expediente = id_expediente;

    const register = await this.repository.preload(data);

    if (!register) {
      throw new NotFoundException(
        `Register with Id_expediente: ${id_expediente} not found`,
      );
    }

    return await this.repository.save(register);
  }

  async remove(id_expediente: number): Promise<Expediente> {
    const expediente = await this.repository.findOne({
      where: { id_expediente },
      relations: ['persona', 'cesion', 'constancia', 'deslinde', 'certificado'],
    });

    if (!expediente) {
      throw new NotFoundException(`Expediente with id: ${id_expediente} not found`);
    }

    await this.repository.delete({ id_expediente });
    return expediente;
  }
}
