import type { Visita } from "../../infraestructure/interfaces/index.interface";
import type { VisitaResponse } from "../../infraestructure/interfaces/visita.interface";
import { VisitaMapper } from "../../infraestructure/mappers/visita.mapper";
import ClientAPI from "../api/visitaApi";

export const obtenerVisitaPorCodigo = async (
  codigo: string,
): Promise<Visita> => {
  const response = await ClientAPI.get<VisitaResponse>("visita/", {
    params: {
      idvisita: codigo,
    },
  });

  const { data } = response;

  const visita = VisitaMapper.fromVisitaResponsetoVisita(data);

  return visita;
};
