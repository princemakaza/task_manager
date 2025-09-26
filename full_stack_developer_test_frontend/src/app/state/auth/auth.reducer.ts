import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  token: localStorage.getItem('jwt_token'),
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  // login
  on(AuthActions.login, (s) => ({ ...s, loading: true, error: null })),
  on(AuthActions.loginSuccess, (s, { token }) => ({ ...s, token, loading: false, error: null })),
  on(AuthActions.loginFailure, (s, { error }) => ({ ...s, loading: false, error })),

  // register
  on(AuthActions.register, (s) => ({ ...s, loading: true, error: null })),
  on(AuthActions.registerSuccess, (s) => ({ ...s, loading: false, error: null })),
  on(AuthActions.registerFailure, (s, { error }) => ({ ...s, loading: false, error })),

  // logout
  on(AuthActions.logout, (s) => ({ ...s, token: null }))
);
