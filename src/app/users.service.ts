import {inject, Injectable} from "@angular/core";
import { ICreateUser, IUser } from "./interfaces/user.interface";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject$.asObservable();

  readonly snackBar = inject(MatSnackBar);

  public setUsers(users:IUser[]) {
    this.usersSubject$.next(users);
    this.snackBar.open('Все пользователи загружены', 'X', {
      duration: 2000
    })
  }

  public editUser(editedUser:IUser) {
    this.usersSubject$.next(
      this.usersSubject$.value.map(
        (user: IUser) => user.id === editedUser.id  ? editedUser : user
      )
    );
    this.snackBar.open('Пользователь отредактирован', 'X', {
      duration: 2000
    })
  }

  public createUser(user:ICreateUser) {
    const existingUser = this.usersSubject$.value.find(
      (currentUser:ICreateUser) => currentUser.email === user.email
    )

    if (existingUser) {
      this.snackBar.open('Такой email занят!', 'X', {
        duration: 2000
      })
    }  else {
      this.usersSubject$.next([user, ...this.usersSubject$.value]);
      this.snackBar.open('Пользователь добавлен', 'X', {
        duration: 2000
      })
    }
  }

  public deleteUser(id:number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: IUser) => user.id !== id)
    );
    this.snackBar.open('Пользователь удалён', 'X', {
      duration: 2000
    })
  }
}
