// src/app/features/tasks/store/tasks.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';
import { TasksService } from '../services/tasks.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TasksEffects {
  // Ensure dependencies exist before field initializers run
  private actions$ = inject(Actions);
  private api = inject(TasksService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(() =>
        this.api.list().pipe(
          map(tasks => TasksActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TasksActions.loadTasksFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      mergeMap(({ payload }) =>
        this.api.create(payload).pipe(
          map(task => TasksActions.createTaskSuccess({ task })),
          catchError(error => of(TasksActions.createTaskFailure({ error })))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      mergeMap(({ id, changes }) =>
        this.api.update(id, changes).pipe(
          map(task => TasksActions.updateTaskSuccess({ task })),
          catchError(error => of(TasksActions.updateTaskFailure({ error })))
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap(({ id }) =>
        this.api.remove(id).pipe(
          map(() => TasksActions.deleteTaskSuccess({ id })),
          catchError(error => of(TasksActions.deleteTaskFailure({ error })))
        )
      )
    )
  );
}
