import { TaskModel, ITask, TaskStatus } from '../models/Task';
import mongoose from 'mongoose';

const STATUS_MAP: Record<string, TaskStatus> = {
  pending: 'pending',
  completed: 'completed',
  Pending: 'pending',
  Completed: 'completed'
};

function normalizeStatus(status?: string): TaskStatus | undefined {
  if (!status) return undefined;
  return STATUS_MAP[status] ?? undefined;
}

export class TaskService {
  async createTask(title: string, description: string | undefined, userId: string, status?: string): Promise<ITask> {
    const normalized = normalizeStatus(status);
    const task = new TaskModel({
      title,
      description,
      status: normalized, // will fall back to schema default if undefined
      createdBy: new mongoose.Types.ObjectId(userId)
    });
    return task.save();
  }

  async updateTask(id: string, data: Partial<{ title: string; description: string; status: string }>, userId: string, isAdmin: boolean): Promise<ITask | null> {
    const update: any = { ...data };
    if (data.status) update.status = normalizeStatus(data.status);
    const filter: any = { _id: id };
    if (!isAdmin) filter.createdBy = userId;
    return TaskModel.findOneAndUpdate(filter, update, { new: true });
  }

  async deleteTask(id: string, userId: string, isAdmin: boolean): Promise<ITask | null> {
    const filter: any = { _id: id };
    if (!isAdmin) filter.createdBy = userId;
    return TaskModel.findOneAndDelete(filter);
  }

  async getTask(id: string, userId: string, isAdmin: boolean): Promise<ITask | null> {
    const filter: any = { _id: id };
    if (!isAdmin) filter.createdBy = userId;
    return TaskModel.findOne(filter);
  }

  async listTasks(page: number, limit: number, userId: string, isAdmin: boolean): Promise<{ tasks: ITask[]; total: number; page: number; pages: number }> {
    const safePage = Math.max(1, page || 1);
    const safeLimit = Math.min(100, Math.max(1, limit || 10));
    const skip = (safePage - 1) * safeLimit;
    const filter: any = {};
    if (!isAdmin) filter.createdBy = userId;
    const [tasks, total] = await Promise.all([
      TaskModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
      TaskModel.countDocuments(filter)
    ]);
    return { tasks, total, page: safePage, pages: Math.ceil(total / safeLimit) };
  }
}
