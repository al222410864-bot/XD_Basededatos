import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detalle } from '../../entities/detalles/detalles.entity';
import { CreateDetalleInput } from '../../dtos/detalles/create-detalle.input';
import { UpdateDetalleInput } from '../../dtos/detalles/update-detalle.input';

function laplace(serie: number[], s: number) {
  const alpha = Math.exp(-s);
  let F = 0,
    W = 0;
  serie.forEach((valor, k) => {
    const peso = Math.pow(alpha, k);
    F += valor * peso;
    W += peso;
  });
  const prediccion = W > 0 ? F / W : 0;
  const tendencia =
    serie.length >= 2
      ? (serie[0] - serie[serie.length - 1]) / (serie.length - 1)
      : 0;
  const media = serie.reduce((acc, val) => acc + val, 0) / (serie.length || 1);
  const varianza =
    serie.reduce((acc, val) => acc + (val - media) ** 2, 0) /
    (serie.length || 1);
  const cv = media > 0 ? (Math.sqrt(varianza) / media) * 100 : 100;
  const confianza_pct = parseFloat(
    Math.max(0, Math.min(100, 100 - cv)).toFixed(1),
  );
  return {
    prediccion: parseFloat(prediccion.toFixed(2)),
    alpha: parseFloat(alpha.toFixed(4)),
    confianza_pct,
    tendencia: parseFloat(tendencia.toFixed(4)),
  };
}

function siguienteMes(mes: string): string {
  const [y, m] = mes.split('-').map(Number);
  const siguiente = new Date(y, m, 1);
  return `${siguiente.getFullYear()}-${String(siguiente.getMonth() + 1).padStart(2, '0')}`;
}

@Injectable()
export class DetalleService {
  constructor(
    @InjectRepository(Detalle)
    private repository: Repository<Detalle>,
  ) {}

  async create(data: CreateDetalleInput): Promise<Detalle> {
    const register = this.repository.create(data);
    return await this.repository.save(register);
  }

  async findAll(): Promise<Detalle[]> {
    return await this.repository.find();
  }

  async findAllPaginate(
    page: number = 1,
    limit: number = 10,
  ): Promise<Detalle[]> {
    const skip = (page - 1) * limit;
    return await this.repository.find({
      skip,
      take: limit,
      order: { id_detalle: 'ASC' },
    });
  }

  async findOne(id_detalle: number): Promise<Detalle | null> {
    return await this.repository.findOneBy({ id_detalle });
  }

  async update(
    id_deslinde: number,
    data: UpdateDetalleInput,
  ): Promise<Detalle> {
    data.id_detalle = id_deslinde;
    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(
        `Register with id_deslinde: ${id_deslinde} not found`,
      );
    }
    return this.repository.save(register);
  }

  async remove(id_detalle: number): Promise<boolean> {
    const result = await this.repository.delete({ id_detalle });
    return result.affected ? result.affected > 0 : false;
  }

  async prediccionDemandaServicios(mesesHistorico = 6, factorS = 0.18) {
    const rows = await this.repository
      .createQueryBuilder('d')
      .select("TO_CHAR(d.fecha, 'YYYY-MM')", 'mes')
      .addSelect('COUNT(*)', 'servicios')
      .groupBy("TO_CHAR(d.fecha, 'YYYY-MM')")
      .orderBy('mes', 'DESC')
      .limit(mesesHistorico)
      .getRawMany();

    if (!rows.length) return [];

    const serie = rows.map((r) => parseInt(r.servicios) || 0);
    const serviciosActuales = serie[0];
    const { prediccion, alpha, confianza_pct, tendencia } = laplace(
      serie,
      factorS,
    );

    return [
      {
        mes_predicho: siguienteMes(rows[0].mes),
        servicios_esperados: Math.round(prediccion),
        factor_alpha: alpha,
        tendencia,
        confianza_pct,
        crecimiento_pct:
          serviciosActuales > 0
            ? parseFloat(
                (
                  ((prediccion - serviciosActuales) / serviciosActuales) *
                  100
                ).toFixed(1),
              )
            : 0,
        meses_analizados: rows.length,
      },
    ];
  }
}
