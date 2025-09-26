import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';           // <-- add this
import { Store } from '@ngrx/store';
import { login } from '../../../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../../state/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],  // <-- include here
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private store = inject(Store);

  form = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);

  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.getRawValue();
    this.store.dispatch(login({ username, password }));
  }
}
