import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface AuthUser {
  isAdmin: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private userSubject$ = new BehaviorSubject<AuthUser | null>(null);

  loginAsAdmin() {
    this.userSubject$.next({ isAdmin: true })
    this.snackBar.open('Вы админ!', 'X', {
      duration: 2000
    })
  }

  loginAsUser() {
    this.userSubject$.next({ isAdmin: false })
    if (this.router.url.includes('/admin')) {
      void this.router.navigate(['/'])
    }
    this.snackBar.open('Вы пользователь!', 'X', {
      duration: 2000
    })
  }

  logout() {
    this.userSubject$.next(null)
    if (this.router.url.includes('/admin')) {
      void this.router.navigate(['/']);
    }
    this.snackBar.open('Вы вышли!', 'X', {
      duration: 2000
    })
  }

  isAdmin(): boolean {
    return this.userSubject$.value?.isAdmin === true
  }

  isLoggedIn(): boolean {
    return this.userSubject$.value !== null
  }
}
