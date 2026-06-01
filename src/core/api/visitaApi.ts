import axios, { AxiosError, type AxiosResponse } from "axios";
import type { ApiError } from "../../infraestructure/interfaces/index.interface";

const ClientAPI = axios.create({
  baseURL: import.meta.env.VITE_API_APP,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

ClientAPI.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError<{ message?: string }>) => {
    if (!error.response) {
      const networkError: ApiError = {
        status: 0,
        message: "No se pudo conectar con el servidor",
      };
      return Promise.reject(networkError);
    }

    const { status, data } = error.response;
    let mensajeError = data?.message ?? "Error inesperado";

    switch (status) {
      case 400:
        mensajeError = data?.message ?? "Solicitud inválida";
        break;
      case 403:
        mensajeError = "Petición rechazada por el servidor";
        break;
      case 404:
        mensajeError = data?.message ?? "Recurso no encontrado";
        break;
      case 500:
        mensajeError = "Error interno del servidor";
        break;
    }

    // Centralizamos el rechazo usando nuestra interfaz
    const apiError: ApiError = {
      status,
      message: mensajeError,
    };

    return Promise.reject(apiError);
  },
);

export default ClientAPI;
