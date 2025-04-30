import {Component, inject} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {User} from "../users-list/users-list.component";

@Component({
  selector: 'app-js-arrays',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './js-arrays.component.html',
  styleUrl: './js-arrays.component.scss'
})

export class JsArraysComponent {
  readonly usersListApi = inject(HttpClient);
  users:User[] = [];

  constructor() {
    this.usersListApi.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(
      (response:User[]) => {
        this.users = response;
      }
    )
  }
}
