import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]),
    LoginComponent,
    RegisterComponent,
  ],
})
export class AuthModule {}
