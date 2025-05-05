import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./users-list/users-list.component";


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  readonly usersListApi = inject(HttpClient);

  getUsers() {
    return this.usersListApi.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }
}
