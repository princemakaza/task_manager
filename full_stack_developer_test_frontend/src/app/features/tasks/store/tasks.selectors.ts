import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState, selectAllTasksArray } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectTasks = createSelector(selectTasksState, selectAllTasksArray);
export const selectTasksLoading = createSelector(selectTasksState, s => s.loading);
export const selectTasksError = createSelector(selectTasksState, s => s.error);
