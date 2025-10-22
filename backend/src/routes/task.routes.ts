import { Router } from "express";
import * as c from "../controllers/task.controller.js";

const router = Router();

router.get("/", c.listTasks);
router.post("/", c.createTask);
router.put("/:id", c.updateTask);
router.delete("/:id", c.deleteTask);

export default router;
