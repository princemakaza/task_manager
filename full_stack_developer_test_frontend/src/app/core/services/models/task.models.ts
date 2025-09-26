export type TaskStatus = 'PENDING' | 'COMPLETED';

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
}

export interface TaskCreate {
  title: string;
  description?: string | null;
  status?: TaskStatus; // optional on create
}

export interface TaskUpdate {
  title: string;
  description?: string | null;
  status: TaskStatus;
}
