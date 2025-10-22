export type TaskEstado = "pendiente" | "completada";

export interface Task {
    id: number;
    titulo: string;
    descripcion: string | null;
    estado: TaskEstado;
}