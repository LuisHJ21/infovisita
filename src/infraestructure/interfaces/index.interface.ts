export interface ApiError {
  status: number;
  message: string;
}

export interface Dispositivo {
  tipo: string;
  descripcion: string;
}

export interface Persona {
  id: number;
  nombres: string;
  documento: string;
  dispositivos: Dispositivo[];
}

export interface Vehiculo {
  tipo: string;
  placa1: string;
  placa2: string;
  marcaModelo: string;
}

export interface Empresa {
  ruc: string;
  nombre: string;
}

export interface Visita {
  fechaIngreso: string;
  fechaSalida: string;
  estado: string;
  codigo: string;
  empresaRepresentada?: Empresa;
  personas: Persona[];
  vehiculos: Vehiculo[];
}
