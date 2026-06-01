import type {
  VehiculoResponse,
  VisitanteResponse,
  VisitaResponse,
} from "../interfaces/visita.interface";
import type {
  Dispositivo,
  Persona,
  Vehiculo,
  Visita,
} from "../interfaces/index.interface";

export class VisitaMapper {
  static fromVisitaResponsetoVisita(response: VisitaResponse): Visita {
    const { EMPRESA, VISITANTES, VEHICULOS } = response;
    return {
      fechaIngreso: response.VISITA_FECHA_ING,
      fechaSalida: response.VISITA_FECHA_SAL,

      estado: response.VISITA_ESTADO ?? "ESTADO_ERROR",
      codigo: response.VISITA_CODIGO,
      empresaRepresentada: {
        ruc: EMPRESA["RUC"] ?? "ERROR_RUC",
        nombre: EMPRESA["NOMBRE"] ?? "ERROR_NOMBRE",
      },
      personas: (VISITANTES ?? []).map(
        (visitante: VisitanteResponse, index: number): Persona => {
          return {
            id: index + 1,
            nombres: visitante["NOMBRE"] ?? "",
            documento: visitante["DNI"] ?? "",

            dispositivos: (visitante["EQUIPOS"] ?? []).map(
              (equipo: any): Dispositivo => {
                return {
                  tipo: equipo["TIPO"] ?? "Desconocido",
                  descripcion: equipo["DESCRIPCION"] ?? "Sin descripción",
                };
              },
            ),
          };
        },
      ),
      vehiculos: (VEHICULOS ?? []).map(
        (vehiculo: VehiculoResponse): Vehiculo => {
          return {
            tipo: vehiculo["TIPO"] ?? "No especificado",
            placa1: vehiculo["PLACA_PRINCIPAL"] ?? "Sin placa",
            placa2: vehiculo["PLACA_SECUNDARIA"] ?? "Sin placa",
            marcaModelo: vehiculo["MODELO"] ?? "No especificado",
          };
        },
      ),
    };
  }
}
