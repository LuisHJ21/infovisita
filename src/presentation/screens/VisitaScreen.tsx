import { useSearchParams } from "react-router";
import {
  Car,
  CircleQuestionMark,
  Laptop,
  ReceiptText,
  Smartphone,
  Tablet,
  User,
} from "lucide-react";
import type {
  ApiError,
  Visita,
} from "../../infraestructure/interfaces/index.interface";
import { useEffect, useState } from "react";
import { obtenerVisitaPorCodigo } from "../../core/services/visista.service";

type estadoRespuesta =
  | "cargando"
  | "sin_parametro"
  | "no_encontrado"
  | "error_servidor"
  | "exito";

const getDeviceIcon = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case "smartphone":
      return <Smartphone size={18} />;

    case "laptop":
      return <Laptop size={18} />;

    case "tablet":
      return <Tablet size={18} />;

    default:
      return <CircleQuestionMark size={18} />;
  }
};

const VisitaScreen = () => {
  const [searchParams] = useSearchParams();
  const codigoVisita = searchParams.get("idvisita");

  const [estadoResponse, setEstadoResponse] =
    useState<estadoRespuesta>("cargando");

  const [visita, setVisita] = useState<Visita | null>(null);

  const buscarVisita = async () => {
    try {
      const datos = await obtenerVisitaPorCodigo(codigoVisita ?? "");

      setVisita(datos);
      setEstadoResponse("exito");
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.status === 404) {
        setEstadoResponse("no_encontrado");
      } else {
        console.log(apiError.message);

        setEstadoResponse("error_servidor");
      }
    }
  };

  useEffect(() => {
    if (!codigoVisita) {
      setEstadoResponse("sin_parametro");
      return;
    }

    buscarVisita();
  }, [codigoVisita]);

  if (estadoResponse === "sin_parametro") {
    return <div className="">Sin parámetro de visita</div>;
  }

  if (estadoResponse === "error_servidor") {
    return <div className="">Error del servidor</div>;
  }

  if (estadoResponse === "no_encontrado") {
    return <div className="">No encontrado</div>;
  }

  if (estadoResponse === "cargando" || !visita) {
    return <div className="p-4 text-center">Cargando información...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-4xl space-y-5">
        {/* HEADER */}
        <div className="flex justify-between rounded-2xl bg-white p-6 shadow-sm items-center">
          <div>
            <span className="text-sm text-gray-500 font-bold">
              {visita.codigo}
            </span>
            <h1 className="text-2xl font-bold ">Detalle de visita</h1>
            <p className="mt-1 text-sm text-slate-500">
              Información de ingreso
            </p>
          </div>

          <div>
            <ReceiptText size={60} className="text-blue-700" />
          </div>
        </div>

        {/* INFO GENERAL */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex  gap-4 flex-row justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Fecha y hora de ingreso</p>

              <h2 className="mt-1 text-xl font-semibold">
                {visita.fechaIngreso.split(" ")[0] ?? "SIN FECHA"}
              </h2>

              <p>{visita.fechaIngreso.split(" ")[1] ?? "SIN HORA"}</p>
            </div>

            <div className="md:text-right">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {visita.estado}
              </span>
            </div>
          </div>
        </div>

        {/* EMPRESA REPRESENTADA */}

        {visita.empresaRepresentada && visita.empresaRepresentada.ruc && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Empresa representada</h2>

            {visita.empresaRepresentada ? (
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                {visita.empresaRepresentada.nombre}
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-4 text-slate-500">
                No se registró empresa representada.
              </div>
            )}
          </div>
        )}

        {/* PERSONAS QUE INGRESARON */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">
            Personas que ingresaron ({visita.personas.length})
          </h2>

          <div className="space-y-4">
            {visita.personas.map((persona, index) => (
              <div
                key={persona.id}
                className="rounded-xl border border-slate-200"
              >
                <div className="py-5 px-3">
                  <div className="flex gap-4 items-center">
                    <div className="flex p-3 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                      <User size={40} />
                    </div>

                    <div>
                      <h3 className="font-semibold">{persona.nombres}</h3>

                      <p className="text-sm text-slate-500">
                        Documento: {persona.documento}
                      </p>
                    </div>
                  </div>

                  {visita.personas[index].dispositivos.length > 0 && (
                    <div className="mt-5 border-t pt-4">
                      <h4 className="mb-3 text-sm font-semibold uppercase text-slate-500">
                        Dispositivos registrados
                      </h4>

                      <div className="space-y-2">
                        {persona.dispositivos.map((dispositivo, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                          >
                            <div className="text-blue-600">
                              {getDeviceIcon(dispositivo.tipo)}
                            </div>

                            <div>
                              <p className="font-medium">{dispositivo.tipo}</p>

                              <p className="text-sm text-slate-500">
                                {dispositivo.descripcion}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VEHICULOS */}
        {visita.vehiculos.length > 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold">
              Vehículos ({visita.vehiculos.length})
            </h2>

            <div className="space-y-4">
              {visita.vehiculos.map((vehiculo, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
                      <Car size={20} />
                    </div>

                    <span className="font-semibold">{vehiculo.tipo}</span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm text-slate-500">Placa 1</p>

                      <p>{vehiculo.placa1}</p>
                    </div>
                    {vehiculo.placa2 && (
                      <div>
                        <p className="text-sm text-slate-500">Placa 2</p>

                        <p>{vehiculo.placa2}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-slate-500">Marca / Modelo</p>

                      <p>{vehiculo.marcaModelo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitaScreen;
