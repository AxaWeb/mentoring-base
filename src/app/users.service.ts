import { Injectable } from "@angular/core";
import { ICreateUser, IUser } from "./interfaces/user.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<IUser[]>([]);
  users$ = this.usersSubject$.asObservable();

  public setUsers(users:IUser[]) {
    this.usersSubject$.next(users)
  }

  public editUser(editedUser:IUser) {
    this.usersSubject$.next(
      this.usersSubject$.value.map(
        (user: IUser) => user.id === editedUser.id  ? editedUser : user
      )
    )
  }

  public createUser(user:ICreateUser) {
    const existingUser = this.usersSubject$.value.find(
      (currentUser:ICreateUser) => currentUser.email === user.email
    )

    if (existingUser) {
      alert('Такой email занят!')
    }  else {
      this.usersSubject$.next([user, ...this.usersSubject$.value])
    }
  }

  public deleteUser(id:number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: IUser) => user.id !== id)
    )
  }
}
