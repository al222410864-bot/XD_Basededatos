import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from '../../entities/pagos/pagos.entity';
import { Detalle } from '../../entities/detalles/detalles.entity';
import { CreatePagoInput } from '../../dtos/pago/create-pago-input';
import { UpdatePagoInput } from '../../dtos/pago/update-pago-input';

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
    varianza: parseFloat(varianza.toFixed(4)),
  };
}

function siguienteMes(mes: string): string {
  const [y, m] = mes.split('-').map(Number);
  const siguiente = new Date(y, m, 1);
  return `${siguiente.getFullYear()}-${String(siguiente.getMonth() + 1).padStart(2, '0')}`;
}

function mesAnio(fecha: Date): string {
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
}

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly repository: Repository<Pago>,
    @InjectRepository(Detalle)
    private readonly detalleRepo: Repository<Detalle>,
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

  async prediccionIngresosProximoMes(mesesHistorico = 8, factorS = 0.15) {
    const rows = await this.detalleRepo
      .createQueryBuilder('d')
      .innerJoin('d.pago', 'p')
      .select("TO_CHAR(d.fecha, 'YYYY-MM')", 'mes')
      .addSelect('SUM(CAST(d.cantidad AS DECIMAL))', 'monto')
      .addSelect('COUNT(*)', 'servicios')
      .groupBy("TO_CHAR(d.fecha, 'YYYY-MM')")
      .orderBy('mes', 'DESC')
      .limit(mesesHistorico)
      .getRawMany();

    if (!rows.length)
      return {
        mes_predicho: siguienteMes(mesAnio(new Date())),
        monto_esperado: 0,
        monto_historico: 0,
        factor_alpha: Math.exp(-factorS),
        confianza_pct: 0,
        tendencia: 0,
        varianza_historica: 0,
        meses_analizados: 0,
      };

    const serieMontos = rows.map((r) => parseFloat(r.monto) || 0);
    const { prediccion, alpha, confianza_pct, tendencia, varianza } = laplace(
      serieMontos,
      factorS,
    );

    const montoHistorico =
      serieMontos.reduce((a, b) => a + b, 0) / serieMontos.length;

    return {
      mes_predicho: siguienteMes(rows[0].mes),
      monto_esperado: prediccion,
      monto_historico: parseFloat(montoHistorico.toFixed(2)),
      factor_alpha: alpha,
      confianza_pct,
      tendencia,
      varianza_historica: varianza,
      meses_analizados: rows.length,
    };
  }

  async resumenIngresos() {
    const [totalIngresos, totalServicios, promPorServicio] = await Promise.all([
      this.detalleRepo
        .createQueryBuilder('d')
        .innerJoin('d.pago', 'p')
        .select('SUM(CAST(d.cantidad AS DECIMAL))', 'total')
        .getRawOne(),
      this.detalleRepo.count(),
      this.detalleRepo
        .createQueryBuilder('d')
        .innerJoin('d.pago', 'p')
        .select('AVG(CAST(d.cantidad AS DECIMAL))', 'promedio')
        .getRawOne(),
    ]);

    return {
      total_ingresos: parseFloat(totalIngresos?.total || 0),
      total_servicios: totalServicios,
      promedio_por_servicio: parseFloat(promPorServicio?.promedio || 0),
      servicios_completados: totalServicios,
      servicios_pendientes: 0,
    };
  }

  async ingresosPorMes(meses = 8) {
    const rows = await this.detalleRepo
      .createQueryBuilder('d')
      .innerJoin('d.pago', 'p')
      .select("TO_CHAR(d.fecha, 'YYYY-MM')", 'mes')
      .addSelect('SUM(CAST(d.cantidad AS DECIMAL))', 'monto')
      .addSelect('COUNT(*)', 'servicios')
      .groupBy("TO_CHAR(d.fecha, 'YYYY-MM')")
      .orderBy('mes', 'DESC')
      .limit(meses)
      .getRawMany();

    return rows.map((r) => ({
      mes: r.mes,
      monto: parseFloat(r.monto) || 0,
      servicios: parseInt(r.servicios) || 0,
    }));
  }

  async prediccionLaplace(tipo: string) {
    const query = `
      SELECT 
        TO_CHAR(d.fecha, 'YYYY-MM') as mes,
        SUM(CAST(d.cantidad AS DECIMAL)) as monto
      FROM detalles d
      GROUP BY TO_CHAR(d.fecha, 'YYYY-MM')
      ORDER BY mes DESC
      LIMIT 12
    `;

    const rows = await this.detalleRepo.query(query);

    if (!rows.length) {
      const now = new Date();
      const periodo = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      return {
        valorEsperado: 0,
        porcentajeConfianza: 0,
        periodo,
        timestamp: now.toISOString(),
        tendencia: 'neutral',
        historial: [],
        prediccion: {
          mes: periodo,
          valor: 0,
          rangoInferior: 0,
          rangoSuperior: 0,
        },
      };
    }

    const serieMontos = rows.map((r) => parseFloat(r.monto) || 0).reverse();
    const historial = rows
      .map((r) => ({
        mes: r.mes,
        valor: parseFloat(r.monto) || 0,
        tipo,
      }))
      .reverse();

    const { prediccion, confianza_pct } = laplace(serieMontos, 0.15);

    const ultimoMes = rows[0].mes;
    const [y, m] = ultimoMes.split('-').map(Number);
    const sigMes = new Date(y, m, 1);
    const sigMesStr = `${sigMes.getFullYear()}-${String(sigMes.getMonth() + 1).padStart(2, '0')}`;

    const ultimoValor = serieMontos[serieMontos.length - 1];
    let tendencia: string;
    if (prediccion > ultimoValor * 1.05) tendencia = 'up';
    else if (prediccion < ultimoValor * 0.95) tendencia = 'down';
    else tendencia = 'neutral';

    const margen = prediccion * 0.15;

    return {
      valorEsperado: parseFloat(prediccion.toFixed(2)),
      porcentajeConfianza: confianza_pct,
      periodo: sigMesStr,
      timestamp: new Date().toISOString(),
      tendencia,
      historial,
      prediccion: {
        mes: sigMesStr,
        valor: parseFloat(prediccion.toFixed(2)),
        rangoInferior: parseFloat((prediccion - margen).toFixed(2)),
        rangoSuperior: parseFloat((prediccion + margen).toFixed(2)),
      },
    };
  }
}
