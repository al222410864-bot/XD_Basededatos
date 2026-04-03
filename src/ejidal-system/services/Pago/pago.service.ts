import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from '../../entities/pagos/pagos.entity';
import { CreatePagoInput } from '../../dtos/pago/create-pago-input';
import { UpdatePagoInput } from '../../dtos/pago/update-pago-input';

@Injectable()
export class PagoService {

  constructor(
    @InjectRepository(Pago)
    private readonly repository: Repository<Pago>,
  ) {}

  async findAll(): Promise<Pago[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number, limit: number): Promise<Pago[]> {
    return await this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id_pago: number): Promise<Pago> {
    const pago = await this.repository.findOneBy({ id_pago });

    if (!pago) {
      throw new NotFoundException(`Pago con id ${id_pago} no encontrado`);
    }

    return pago;
  }

  async create(input: CreatePagoInput): Promise<Pago> {
    const pago = this.repository.create(input);
    return await this.repository.save(pago);
  }

  async update(id_pago: number, input: UpdatePagoInput): Promise<Pago> {
    const pago = await this.findOne(id_pago);

    Object.assign(pago, input);

    return await this.repository.save(pago);
  }

  async remove(id_pago: number): Promise<boolean> {
    const pago = await this.findOne(id_pago);

    await this.repository.remove(pago);

    return true;
  }

}