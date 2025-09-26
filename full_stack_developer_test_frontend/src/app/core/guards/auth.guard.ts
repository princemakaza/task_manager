// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../state/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return new Observable(obs => {
      this.store.select(selectIsAuthenticated).subscribe(isAuth => {
        if (isAuth) {
          obs.next(true);
        } else {
          obs.next(this.router.createUrlTree(['/auth/login']));
        }
        obs.complete();
      });
    });
  }
}
