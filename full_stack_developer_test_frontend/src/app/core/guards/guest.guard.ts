import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../state/auth/auth.selectors';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate() {
    return this.store.select(selectIsAuthenticated).pipe(
      map(isAuth => (isAuth ? this.router.createUrlTree(['/tasks']) : true))
    );
  }
}
