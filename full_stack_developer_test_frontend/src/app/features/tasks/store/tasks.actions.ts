import { createAction, props } from '@ngrx/store';
import { Task, TaskCreate, TaskUpdate } from '../../../core/services/models/task.models';

export const loadTasks = createAction('[Tasks] Load');
export const loadTasksSuccess = createAction('[Tasks] Load Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Tasks] Load Failure', props<{ error: any }>());

export const createTask = createAction('[Tasks] Create', props<{ payload: TaskCreate }>());
export const createTaskSuccess = createAction('[Tasks] Create Success', props<{ task: Task }>());
export const createTaskFailure = createAction('[Tasks] Create Failure', props<{ error: any }>());

export const updateTask = createAction(
  '[Tasks] Update',
  props<{ id: number; changes: TaskUpdate }>()
);
export const updateTaskSuccess = createAction('[Tasks] Update Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Tasks] Update Failure', props<{ error: any }>());

export const deleteTask = createAction('[Tasks] Delete', props<{ id: number }>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Success', props<{ id: number }>());
export const deleteTaskFailure = createAction('[Tasks] Delete Failure', props<{ error: any }>());
