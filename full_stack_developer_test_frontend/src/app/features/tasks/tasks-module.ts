// src/app/features/tasks/tasks-module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard';

// NgRx feature
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tasksReducer } from './store/tasks.reducer';
import { TasksEffects } from './store/tasks.effects';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    // 👇 this registers the 'tasks' feature slice for this lazy module
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects]),

    // standalone page
    DashboardComponent,
  ],
})
export class TasksModule {}
