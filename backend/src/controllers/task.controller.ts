import type {Request, Response} from "express";
import * as repo from "../repos/task.repo.js";

export async function listTasks(req: Request, res: Response) {
    const tasks =  await repo.getAllTasks();
    res.json(tasks);
}

export async function createTask(req: Request, res: Response) {
    const { titulo, descripcion, estado } = req.body;
    const created = await repo.createTask({ titulo, descripcion, estado });
    res.status(201).json(created);
}

export async function updateTask(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { titulo, descripcion, estado } = req.body;
    const updated = await repo.updateTask(id, { titulo, descripcion, estado });
    res.json(updated);
}

export async function deleteTask(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await repo.deleteOne(id);
    res.json({ deleted });
}