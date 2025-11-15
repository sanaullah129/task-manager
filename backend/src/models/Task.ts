import mongoose, { Document, Schema } from 'mongoose';

export type TaskStatus = 'pending' | 'completed';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
