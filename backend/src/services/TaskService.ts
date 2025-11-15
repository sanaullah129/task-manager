import { TaskModel, ITask, TaskStatus } from '../models/Task';
import mongoose from 'mongoose';

export class TaskService {
  async createTask(title: string, description: string | undefined, userId: string): Promise<ITask> {
    const task = new TaskModel({ title, description, createdBy: new mongoose.Types.ObjectId(userId) });
    return task.save();
  }

  async updateTask(id: string, data: Partial<{ title: string; description: string; status: TaskStatus }>): Promise<ITask | null> {
    return TaskModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTask(id: string): Promise<ITask | null> {
    return TaskModel.findByIdAndDelete(id);
  }

  async getTask(id: string): Promise<ITask | null> {
    return TaskModel.findById(id);
  }

  async listTasks(page: number, limit: number): Promise<{ tasks: ITask[]; total: number; page: number; pages: number }> {
    const skip = (page - 1) * limit;
    const [tasks, total] = await Promise.all([
      TaskModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      TaskModel.countDocuments()
    ]);
    return { tasks, total, page, pages: Math.ceil(total / limit) };
  }
}
