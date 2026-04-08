import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Float,
  Int,
  Args,
} from '@nestjs/graphql';
import { DashboardService, PagoService, DetalleService } from '../../services';

@ObjectType()
export class PrediccionIngresosType {
  @Field() mes_predicho: string;
  @Field(() => Float) monto_esperado: number;
  @Field(() => Float) monto_historico: number;
  @Field(() => Float) factor_alpha: number;
  @Field(() => Float) confianza_pct: number;
  @Field(() => Float) tendencia: number;
  @Field(() => Float) varianza_historica: number;
  @Field(() => Int) meses_analizados: number;
}

@ObjectType()
export class PrediccionDemandaServiciosType {
  @Field() mes_predicho: string;
  @Field(() => Int) servicios_esperados: number;
  @Field(() => Float) factor_alpha: number;
  @Field(() => Float) tendencia: number;
  @Field(() => Float) confianza_pct: number;
  @Field(() => Float) crecimiento_pct: number;
  @Field(() => Int) meses_analizados: number;
}

@ObjectType()
export class ResumenIngresosType {
  @Field(() => Float) total_ingresos: number;
  @Field(() => Int) total_servicios: number;
  @Field(() => Float) promedio_por_servicio: number;
  @Field(() => Int) servicios_completados: number;
  @Field(() => Int) servicios_pendientes: number;

}

@ObjectType()
export class IngresosPorMesType {
  @Field()
  mes: string;

  @Field(() => Float)
  monto: number;
}

@ObjectType()
export class HistorialItem {
  @Field() mes: string;
  @Field(() => Float) valor: number;
  @Field() tipo: string;
}

@ObjectType()
export class PrediccionItem {
  @Field() mes: string;
  @Field(() => Float) valor: number;
  @Field(() => Float) rangoInferior: number;
  @Field(() => Float) rangoSuperior: number;
}

@ObjectType()
export class PrediccionLaplaceResponse {
  @Field(() => Float) valorEsperado: number;
  @Field(() => Float) porcentajeConfianza: number;
  @Field() periodo: string;
  @Field() timestamp: string;
  @Field() tendencia: string;
  @Field(() => [HistorialItem]) historial: HistorialItem[];
  @Field(() => PrediccionItem) prediccion: PrediccionItem;
}

@Resolver()
export class DashboardResolver {
  constructor(
    private readonly pagoService: PagoService,
    private readonly detalleService: DetalleService,
  ) { }

  @Query(() => String, { name: 'helloDashboard' })
  helloDashboard() {
    return 'Dashboard Ejidal — OK';
  }

  @Query(() => PrediccionIngresosType, {
    name: 'prediccionIngresosProximoMes',
    description:
      'Predice los ingresos del proximo mes usando Transformada de Laplace. s=0.15 -> alpha~0.861.',
  })
  prediccionIngresosProximoMes(
    @Args('mesesHistorico', { type: () => Int, defaultValue: 8 })
    mesesHistorico: number,
    @Args('factorS', { type: () => Float, defaultValue: 0.15 }) factorS: number,
  ) {
    return this.pagoService.prediccionIngresosProximoMes(
      mesesHistorico,
      factorS,
    );
  }

  @Query(() => [PrediccionDemandaServiciosType], {
    name: 'prediccionDemandaServicios',
    description:
      'Predice la demanda de servicios por tipo. s=0.18 -> alpha~0.835.',
  })
  prediccionDemandaServicios(
    @Args('mesesHistorico', { type: () => Int, defaultValue: 6 })
    mesesHistorico: number,
    @Args('factorS', { type: () => Float, defaultValue: 0.18 }) factorS: number,
  ) {
    return this.detalleService.prediccionDemandaServicios(
      mesesHistorico,
      factorS,
    );
  }

  @Query(() => ResumenIngresosType, { name: 'resumenIngresos' })
  resumenIngresos() {
    return this.pagoService.resumenIngresos();
  }

  @Query(() => [IngresosPorMesType], { name: 'ingresosPorMes' })
  ingresosPorMes(
    @Args('meses', { type: () => Int, defaultValue: 8 }) meses: number,
  ) {
    return this.pagoService.ingresosPorMes(meses);
  }

  @Query(() => PrediccionLaplaceResponse, { name: 'prediccionLaplace' })
  prediccionLaplace(@Args('tipo', { type: () => String }) tipo: string) {
    return this.pagoService.prediccionLaplace(tipo);
  }
}
