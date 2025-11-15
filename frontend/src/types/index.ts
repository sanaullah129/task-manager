export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
}

export type TaskStatus = 'Pending' | 'Completed';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface PaginatedTasks {
  tasks: Task[];
  total: number;
  page: number;
  pages: number;
}
