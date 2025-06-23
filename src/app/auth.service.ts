import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface AuthUser {
  isAdmin: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private userSubject$ = new BehaviorSubject<AuthUser | null>(null);

  loginAsAdmin() {
    this.userSubject$.next({ isAdmin: true })
  }

  loginAsUser() {
    this.userSubject$.next({ isAdmin: false })
    if (this.router.url.includes('/admin')) {
      void this.router.navigate(['/'])
    }
  }

  logout() {
    this.userSubject$.next(null)
    if (this.router.url.includes('/admin')) {
      void this.router.navigate(['/']);
    }
  }

  isLoggedIn(): boolean {
    return this.userSubject$.value !== null
  }

  isAdmin(): boolean {
    return this.userSubject$.value?.isAdmin === true
  }

  isUser(): boolean {
    return this.userSubject$.value?.isAdmin === false;
  }
}
