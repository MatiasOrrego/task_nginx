import pool from "../db/pool";
import type { Task, TaskEstado } from "../models/task.model";


//Trae todas las taras
export async function getAllTasks(): Promise<Task[]> {
    const result = await pool.query<Task>("SELECT * FROM tasks ORDER BY id ASC");
    return result.rows;
}

//Crea una nueva tarea
export async function createTask(input:{
    titulo: string;
    descripcion?: string;
    estado?: TaskEstado;
}): Promise<Task> {
    const {titulo, descripcion = null, estado = "pendiente"} = input;
    const result = await pool.query<Task>(
        "INSERT INTO tasks (titulo, descripcion, estado) VALUES ($1, $2, $3) RETURNING *",
        [titulo, descripcion, estado]
    );
    const created = result.rows[0];
    if (!created) {
        throw new Error("Failed to create task");
    }
    return created;
}

//Actualiza una tarea
export async function updateTask(
    id:number,
    input: Partial<{ titulo: string; descripcion: string; estado: TaskEstado }>)
    : Promise<Task | null> {
        const {titulo = null, descripcion = null, estado = null} = input;
        const { rows }  = await pool.query<Task>(
    `UPDATE tasks
     SET titulo = COALESCE($1, titulo),
         descripcion = COALESCE($2, descripcion),
         estado = COALESCE($3, estado)
     WHERE id = $4
     RETURNING *`,
    [titulo, descripcion, estado, id]
  );

  return rows[0] ?? null;
}

//Elimina una tarea
export async function deleteOne(id: number): Promise<boolean> {
  const { rowCount } = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return (rowCount ?? 0) > 0;
}