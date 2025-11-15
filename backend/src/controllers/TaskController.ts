import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  private taskService = new TaskService();

  create = async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      const userId = (req as any).userId as string;
      const task = await this.taskService.createTask(title, description, userId);
      res.status(201).json(task);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const updated = await this.taskService.updateTask(id, { title, description, status });
      if (!updated) return res.status(404).json({ error: 'Not found' });
      res.json(updated);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.taskService.deleteTask(id);
      if (!deleted) return res.status(404).json({ error: 'Not found' });
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTask(id);
      if (!task) return res.status(404).json({ error: 'Not found' });
      res.json(task);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const page = parseInt((req.query.page as string) || '1', 10);
      const limit = parseInt((req.query.limit as string) || '10', 10);
      const data = await this.taskService.listTasks(page, limit);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  };
}
