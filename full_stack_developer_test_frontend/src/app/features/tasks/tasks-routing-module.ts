import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  {
    path: 'auth',
    loadChildren: () =>
      import('../auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('../tasks/tasks-module').then(m => m.TasksModule)
  },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
