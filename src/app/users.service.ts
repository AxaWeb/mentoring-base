import { Injectable } from "@angular/core";
import { iCreateUser, iUser } from "./interfaces/user.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<iUser[]>([]);
  users$ = this.usersSubject$.asObservable();

  public setUsers(users:iUser[]) {
    this.usersSubject$.next(users);
  }

  public editUser(editedUser:iUser) {
    this.usersSubject$.next(
      this.usersSubject$.value.map(
        (user: iUser) => user.id === editedUser.id  ? editedUser : user
      )
    )
  }

  public createUser(user:iCreateUser) {
    const existingUser = this.usersSubject$.value.find(
      (currentUser:iCreateUser) => currentUser.email === user.email
    )

    if (existingUser) {
      alert(`Такой email занят!`);
    }  else {
      this.usersSubject$.next([user, ...this.usersSubject$.value]);
      alert(`Юзер добавлен`);
    }
  }

  public deleteUser(id:number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: iUser) => user.id !== id)
    );
  }
}
