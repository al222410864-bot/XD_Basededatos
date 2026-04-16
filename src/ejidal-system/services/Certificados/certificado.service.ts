import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Certificado } from '../../entities/certificados/certificados.entity';
import { CreateCertificadoInput } from '../../dtos/certificados/create-cetificados.input';
import { UpdateCertificadoInput } from '../../dtos/certificados/update-certificados.input';

@Injectable()
export class CertificadoService {
  constructor(
    @InjectRepository(Certificado)
    private repository: Repository<Certificado>
  ) {}

  async create(data: CreateCertificadoInput): Promise<Certificado> {
    try {
      const register = this.repository.create(data);
      return await this.repository.save(register);
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Folio Inválido: Este folio ya está registrado.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Certificado[]> {
    return await this.repository.find();
  }

  async findAllPaginate(page: number = 1, limit: number = 10): Promise<Certificado[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: {id_certificado: 'ASC'},
    });
  }

  async findOne(id_certificado: number): Promise<Certificado | null> {
    return await this.repository.findOneBy({id_certificado});
  }

  async update(id_certificado: number, data: UpdateCertificadoInput): Promise<Certificado> {
    data.id_certificado = id_certificado;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Register with id_certificado: ${id_certificado} not found`);
    }
    return this.repository.save(register);
  }

  async remove(id_certificado: number): Promise<boolean> {
    const result = await this.repository.delete({id_certificado});
    return result.affected ? result.affected > 0 : false;
  }
}
