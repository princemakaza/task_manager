import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of, switchMap, map, catchError, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  // Use inject() so these are ready before effect fields are created
  private actions$ = inject(Actions);
  private auth = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.auth.login({ username, password }).pipe(
          map(res => AuthActions.loginSuccess({ token: res.token })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigateByUrl('/tasks'))
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ username, password }) =>
        this.auth.register({ username, password }).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => this.router.navigateByUrl('/auth/login'))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.auth.logout();
          this.router.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );
}
