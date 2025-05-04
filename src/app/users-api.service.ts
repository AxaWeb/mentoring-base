import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  readonly usersListApi = inject(HttpClient);

  getUsers() {
    return this.usersListApi.get('https://jsonplaceholder.typicode.com/users')
  }
}
