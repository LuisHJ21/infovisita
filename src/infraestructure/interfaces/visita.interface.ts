export interface VisitaResponse {
  VISITA_CODIGO: string;
  VISITA_FECHA_ING: string;
  VISITA_FECHA_SAL: string;
  VISITA_TIPO_INGRESO: string;
  VISITA_MOTIVO_INGRESO: string;
  VISITA_MOTIVO: string;
  VISITA_ESTADO: string;
  RESPONSABLE: string;
  ZONA: string;
  EMPRESA: EmpresaResponse;
  VEHICULOS: VehiculoResponse[]; // Definir según la estructura cuando no esté vacío
  VISITANTES: VisitanteResponse[];
}

export interface EmpresaResponse {
  RUC: string;
  NOMBRE: string;
}

export interface VisitanteResponse {
  DNI: string;
  NOMBRE: string;
  EQUIPOS: EquipoResponse[];
}

export interface VehiculoResponse {
  TIPO: string;
  PLACA_PRINCIPAL: string;
  PLACA_SECUNDARIA: string;
  MODELO: string;
}

export interface EquipoResponse {
  TIPO: string;
  MARCA: string;
  SERIE: string;
  CARACTERISTICAS: string;
}
