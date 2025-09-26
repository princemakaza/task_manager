// src/app/features/auth/pages/register/register.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';   // <—

import { Store } from '@ngrx/store';
import { register } from '../../../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../../state/auth/auth.selectors';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],  // <—
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  private store = inject(Store);

  form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
  });

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.getRawValue();
    this.store.dispatch(register({ username, password }));
  }
}
