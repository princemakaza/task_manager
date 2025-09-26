// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
}

interface JwtResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8080/auth';
  private readonly TOKEN_KEY = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(req: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.API}/login`, req).pipe(
      tap(res => this.setToken(res.token))
    );
  }

  register(req: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API}/register`, req);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
