import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtService {
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isExpired(token: string): boolean {
    try {
      const payload = this.decodePayload(token);
      if (!payload?.exp) return false; // if no exp, don't block; backend will 401 if invalid
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true; // bad token -> treat as expired
    }
  }

  private decodePayload(token: string): any | null {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  }
}
