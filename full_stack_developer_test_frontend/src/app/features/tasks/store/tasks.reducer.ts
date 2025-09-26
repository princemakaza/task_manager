import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as TasksActions from './tasks.actions';
import { Task } from '../../../core/services/models/task.models';

export interface TasksState extends EntityState<Task> {
  loading: boolean;
  error: any | null;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (t) => t.id,
  sortComparer: (a, b) => b.id - a.id, // newest first
});

export const initialState: TasksState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const tasksReducer = createReducer(
  initialState,

  on(TasksActions.loadTasks, (s) => ({ ...s, loading: true, error: null })),
  on(TasksActions.loadTasksSuccess, (s, { tasks }) =>
    adapter.setAll(tasks, { ...s, loading: false, error: null })
  ),
  on(TasksActions.loadTasksFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(TasksActions.createTask, (s) => ({ ...s, loading: true, error: null })),
  on(TasksActions.createTaskSuccess, (s, { task }) =>
    adapter.addOne(task, { ...s, loading: false })
  ),
  on(TasksActions.createTaskFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(TasksActions.updateTask, (s) => ({ ...s, loading: true, error: null })),
  on(TasksActions.updateTaskSuccess, (s, { task }) =>
    adapter.updateOne({ id: task.id, changes: task }, { ...s, loading: false })
  ),
  on(TasksActions.updateTaskFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(TasksActions.deleteTask, (s) => ({ ...s, loading: true, error: null })),
  on(TasksActions.deleteTaskSuccess, (s, { id }) =>
    adapter.removeOne(id, { ...s, loading: false })
  ),
  on(TasksActions.deleteTaskFailure, (s, { error }) => ({ ...s, loading: false, error })),
);

// entity selectors
export const {
  selectAll: selectAllTasksArray,
  selectEntities: selectTaskEntities,
  selectIds: selectTaskIds,
  selectTotal: selectTaskTotal,
} = adapter.getSelectors();
