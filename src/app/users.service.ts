import {Injectable} from "@angular/core";
import {User} from "./users-list/users-list.component";
import {BehaviorSubject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject$.asObservable();

  public setUsers(users:User[]) {
    this.usersSubject$.next(users);
  }

  public editUser(editedUser:User) {
    this.usersSubject$.next(
      this.usersSubject$.value.map(
        (user: User) => user.id === editedUser.id  ? editedUser : user
      )
    )
  }

  public createUser(user:User) {
    const existingUser = this.usersSubject$.value.find(
      (currentUser:User) => currentUser.email === user.email
    )

    if (existingUser) {
      alert(`Такой email занят!`);
    }  else {
      this.usersSubject$.next([...this.usersSubject$.value, user]);
      alert(`Юзер добавлен`);
    }
  }

  public deleteUser(id:number) {
    this.usersSubject$.next(
      this.usersSubject$.value.filter((user: User) => user.id !== id)
    );
  }
}
