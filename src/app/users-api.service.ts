import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "./interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  readonly usersListApi = inject(HttpClient);

  public getUsers() {
    return this.usersListApi.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
  }
}
