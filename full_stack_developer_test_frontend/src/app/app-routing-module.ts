import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],   // 👈 protect the dashboard
    loadChildren: () => import('./features/tasks/tasks-module').then(m => m.TasksModule),
  },
  { path: '**', redirectTo: 'tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
